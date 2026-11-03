import { test as base } from '@playwright/test';
import { randomUUID } from 'crypto';
import { PaymentPage } from '../pages/payment-page';
import { registerCustomer, loginCustomer } from './customer-setup-api';
import { findProductByName, createCart, addItemToCart } from './cart-api';

// Every test starts with a new customer who is signed in, 
// has 1 claw hammer in the cart and,
// is on the Payment step
export const test = base.extend<{ shopper: { token: string; cartId: string }; paymentPage: PaymentPage }>({
  // The customer and the cart are set up through the API. The cart id is also given to the tests, to check that the cart is gone after the order
  shopper: async ({ request }, use) => {
    // Test setup through the API: a unique customer, the login and a cart with 1 claw hammer. 
    // The email has a random id, because tests running in parallel can start in the same millisecond (caused a test failure in the initial test)
    const customerEmail = `payment.${randomUUID()}@example.com`;
    const customerPassword = 'Welcome01!x';
    await registerCustomer(request, customerEmail, customerPassword);
    const token = await loginCustomer(request, customerEmail, customerPassword);
    const product = await findProductByName(request, 'Claw Hammer');
    const cartId = await createCart(request);
    await addItemToCart(request, cartId, product.id, 1);
    await use({ token, cartId });
  },

  paymentPage: async ({ page, shopper }, use) => {
    // The app looks for the login in the local storage and for the cart in the session storage, so both are handed to the browser
    await page.goto('/');
    await page.evaluate(([authToken, id]) => {
      localStorage.setItem('auth-token', authToken);
      sessionStorage.setItem('cart_id', id);
    }, [shopper.token, shopper.cartId]);

    // The site looks up the address from the postcode and replaces the registered address with the result. If the order is confirmed before that,
    // the registered address (123 Main St, Anytown, CA) goes with it and the server rejects the order with a 422, so the lookup is waited for
    const addressLookup = page.waitForResponse((response) => response.url().includes('/postcode-lookup'));
    addressLookup.catch(() => {});

    // The only UI part: going through the checkout steps to the Payment step. The address is already filled from the registered customer
    const paymentPage = new PaymentPage(page);
    await paymentPage.gotoBillingAddressStep();
    await paymentPage.billingProceedToCheckoutButton.click();
    await addressLookup;
    await use(paymentPage);
  },
});

export { expect } from '@playwright/test';
