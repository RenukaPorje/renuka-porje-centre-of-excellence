import { test, expect } from '../support/payment-fixture';
import { cardExpiryDate } from '../support/test-data-helper';
import { getCartStatus } from '../support/cart-api';

test.describe('Checkout Payment Step', () => {
test('TS-01 - Happy-path: Payment step offers all five payment methods', async ({ paymentPage }) => {
  await expect(paymentPage.paymentMethodSelect.locator('option')).toHaveText([
  'Choose your payment method', 'Bank Transfer', 'Cash on Delivery', 'Credit Card', 'Buy Now Pay Later', 'Gift Card',
]);
});

test('TS-02 - Happy-path: Shopper can place an order with Bank Transfer', async ({ paymentPage, shopper, request }) => {
  await paymentPage.selectPaymentMethod('bank-transfer');
  await expect(paymentPage.bankNameField).toBeEmpty();
  await expect(paymentPage.accountNameField).toBeEmpty();
  await expect(paymentPage.accountNumberField).toBeEmpty();

  // Fill in bank transfer details, check and confirm payment
  await paymentPage.fillBankTransferDetails('Bank of America', 'Jane Smith', '0012345678');
  await paymentPage.confirmPayment();

  // The order confirmation page should show an invoice number and the cart should be gone after the order is placed, because the app deletes it
  await expect(paymentPage.orderConfirmation).toContainText(/Your invoice number is \S+/);
  await expect.poll(() => getCartStatus(request, shopper.cartId)).toBe(404);
});

// Selecting Cash on Delivery should hide any other detail fields (from other methods)
test('TS-03 - Happy-path: Shopper can place an order with Cash on Delivery', async ({ paymentPage, shopper, request }) => {
  // Select Cash on Delivery and check that other payment method fields are hidden
  await paymentPage.selectPaymentMethod('cash-on-delivery');
  await expect(paymentPage.bankNameField).toBeHidden();
  await expect(paymentPage.giftCardNumberField).toBeHidden();
  await expect(paymentPage.monthlyInstallmentsSelect).toBeHidden();

  await paymentPage.confirmPayment();

  await expect(paymentPage.orderConfirmation).toContainText(/Your invoice number is \S+/);
  await expect.poll(() => getCartStatus(request, shopper.cartId)).toBe(404);
});

test('TS-04 - Happy-path: Shopper can place an order with Credit Card', async ({ paymentPage, shopper, request }) => {
  const cardNumberMessage = 'Enter your 16-digit credit card number as it appears on the card, in the format 0000-0000-0000-0000. Ensure that you include the hyphens for proper formatting.';
  const cvvMessage = "The CVV is a 3-digit or 4-digit number. It's used for added security during card-not-present transactions.";
  await paymentPage.selectPaymentMethod('credit-card');
  await expect(paymentPage.creditCardNumberField).toBeEmpty();
  await expect(paymentPage.expirationDateField).toBeEmpty();
  await expect(paymentPage.cvvField).toBeEmpty();
  await expect(paymentPage.cardHolderNameField).toBeEmpty();
  await expect(paymentPage.cardNumberHelpText).toHaveText(cardNumberMessage);
  await expect(paymentPage.cvvHelpText).toHaveText(cvvMessage);

  // Fill in credit card details, check and confirm payment
  await paymentPage.creditCardNumberField.fill('4111-1111-1111-1111');
  await paymentPage.expirationDateField.fill(cardExpiryDate(2));
  await paymentPage.cvvField.fill('567');
  await paymentPage.cardHolderNameField.fill('John Doe');
  await paymentPage.confirmPayment();

  // The order confirmation page should show an invoice number and the cart should be gone after the order is placed, because the app deletes it
  await expect(paymentPage.orderConfirmation).toContainText(/Your invoice number is \S+/);
  await expect.poll(() => getCartStatus(request, shopper.cartId)).toBe(404);
});

test('TS-05 - Happy-path: Shopper can place an order with Buy Now Pay Later', async ({ paymentPage, shopper, request }) => {
  await paymentPage.selectPaymentMethod('buy-now-pay-later');
  await expect(paymentPage.monthlyInstallmentsSelect).toBeVisible();
  // Select a number of monthly installments, check and confirm payment
  await paymentPage.monthlyInstallmentsSelect.selectOption('6');
  await paymentPage.confirmPayment();

  // The order confirmation page should show an invoice number and the cart should be gone after the order is placed, because the app deletes it
  await expect(paymentPage.orderConfirmation).toContainText(/Your invoice number is \S+/);
  await expect.poll(() => getCartStatus(request, shopper.cartId)).toBe(404);
});

test('TS-06 - Happy-path: Shopper can place an order with Gift Card', async ({ paymentPage, shopper, request }) => {
  await paymentPage.selectPaymentMethod('gift-card');
  await expect(paymentPage.giftCardNumberField).toBeEmpty();
  await expect(paymentPage.giftCardValidationCodeField).toBeEmpty();

  // Fill in gift card details, check and confirm payment
  await paymentPage.giftCardNumberField.fill('1234567890123456');
  await paymentPage.giftCardValidationCodeField.fill('1234');
  await paymentPage.confirmPayment();

  // The order confirmation page should show an invoice number
  await expect(paymentPage.orderConfirmation).toContainText(/Your invoice number is \S+/);

  // The cart should be gone after the order is placed, because the app deletes it
  await expect.poll(() => getCartStatus(request, shopper.cartId)).toBe(404);
});

test.describe('TS-07 - Happy-path: Each of the other offered numbers of monthly instalments is accepted', () => {
  // 6 monthly instalments are covered in TS-05

  // Test the other offered numbers of monthly instalments: 3, 9 and 12
  for (const instalments of ['3', '9', '12']) {
    test(`${instalments} monthly instalments`, async ({ paymentPage, shopper, request }) => {
      await paymentPage.selectPaymentMethod('buy-now-pay-later');
      await paymentPage.monthlyInstallmentsSelect.selectOption(instalments);
      await paymentPage.confirmPayment();

      // The order confirmation page should show an invoice number and the cart should be gone after the order is placed, because the app deletes it
      await expect(paymentPage.orderConfirmation).toContainText(/Your invoice number is \S+/);
      await expect.poll(() => getCartStatus(request, shopper.cartId)).toBe(404);
    });
  }
});

});

