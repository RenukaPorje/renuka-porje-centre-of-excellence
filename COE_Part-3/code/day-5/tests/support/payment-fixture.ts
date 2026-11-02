import { test as base } from '@playwright/test';
import { PaymentPage } from '../pages/payment-page';
import { registerCustomer, loginCustomer } from './customer-setup-api';
import { findProductByName, createCart, addItemToCart } from './cart-api';

// Every test starts with a new customer who is signed in, has 1 claw hammer in the cart and is on the Payment step
export const test = base.extend<{ paymentPage: PaymentPage }>({
  paymentPage: async ({ page, request }, use) => {
    // Test setup through the API: a unique customer, the login and a cart with 1 claw hammer
    const customerEmail = `payment.${Date.now()}@example.com`;
    const customerPassword = 'Welcome01!x';
    await registerCustomer(request, customerEmail, customerPassword);
    const token = await loginCustomer(request, customerEmail, customerPassword);
    const product = await findProductByName(request, 'Claw Hammer');
    const cartId = await createCart(request);
    await addItemToCart(request, cartId, product.id, 1);

    // The app looks for the login in the local storage and for the cart in the session storage, so both are handed to the browser
    await page.goto('/');
    await page.evaluate(([authToken, id]) => {
      localStorage.setItem('auth-token', authToken);
      sessionStorage.setItem('cart_id', id);
    }, [token, cartId]);

    // The only UI part: going through the checkout steps to the Payment step. The address is already filled from the registered customer
    const paymentPage = new PaymentPage(page);
    await paymentPage.gotoBillingAddressStep();
    await paymentPage.billingProceedToCheckoutButton.click();
    await use(paymentPage);
  },
});

export { expect } from '@playwright/test';
