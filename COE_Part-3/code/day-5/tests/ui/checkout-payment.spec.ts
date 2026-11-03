import { test, expect } from '../support/payment-fixture';
import { PaymentPage } from '../pages/payment-page';


/*
await page.locator('[data-test="country"]').selectOption('US');
  await page.locator('[data-test="postal_code"]').click();
  await page.locator('[data-test="postal_code"]').fill('36547');
  await page.locator('[data-test="house_number"]').click();
  await page.locator('[data-test="house_number"]').fill('5765');
  await page.locator('[data-test="street"]').click();
  await page.locator('[data-test="proceed-3"]').click();
  await page.locator('[data-test="payment-method"]').selectOption('bank-transfer');
  await page.locator('[data-test="bank_name"]').click();
  await page.locator('[data-test="bank_name"]').fill('5465576587595756');
  await page.locator('[data-test="account_name"]').click();
  await page.locator('.alert').click();
  await page.locator('[data-test="bank_name"]').click();
  await page.locator('[data-test="bank_name"]').dblclick();
  await page.locator('[data-test="bank_name"]').fill('BANK A Test');
  await page.locator('[data-test="account_name"]').click();
  await page.locator('[data-test="account_name"]').fill('Testing 1');
  await page.locator('[data-test="account_number"]').click();
  await page.locator('[data-test="account_number"]').fill('3254857324994239749723194');
  await page.locator('[data-test="finish"]').click();
  await page.locator('[data-test="payment-method"]').selectOption('cash-on-delivery');
  await page.locator('[data-test="payment-method"]').selectOption('buy-now-pay-later');
  await page.locator('[data-test="monthly_installments"]').selectOption('3');
  await page.locator('[data-test="monthly_installments"]').selectOption('6');
  await page.locator('[data-test="monthly_installments"]').selectOption('9');
  await page.locator('[data-test="monthly_installments"]').selectOption('12');
  await page.getByText('PaymentPayment MethodChoose').click();
  await page.locator('[data-test="payment-method"]').selectOption('gift-card');
  await page.locator('[data-test="gift_card_number"]').click();
  await page.locator('[data-test="gift_card_number"]').fill('3625627387324782');
  await page.locator('[data-test="validation_code"]').click();
  await page.locator('[data-test="validation_code"]').fill('4343');
  await page.locator('div').filter({ hasText: 'PaymentPayment MethodChoose' }).nth(3).click();
  await page.locator('[data-test="finish"]').click();
   await page.locator('[data-test="credit_card_number"]').fill('5466-7238-8234627645');
  await page.locator('[data-test="credit_card_number"]').click();
  await page.locator('[data-test="credit_card_number"]').fill('5466-7238-8234-627645');
  await page.locator('[data-test="credit_card_number"]').click();
  await page.locator('[data-test="credit_card_number"]').fill('5466-7238-8234-6276');
  await page.locator('[data-test="expiration_date"]').click();
  await page.locator('[data-test="expiration_date"]').fill('12/2026');
  await page.locator('[data-test="cvv"]').click();
  await page.locator('[data-test="cvv"]').fill('342');
  await page.locator('[data-test="card_holder_name"]').click();
  await page.locator('[data-test="card_holder_name"]').fill('TESTing');
  await page.locator('[data-test="finish"]').click();
  await page.locator('[data-test="finish"]').click();
});
});

*/

test.describe('Checkout Payment Step', () => {
test('TS-01 - Happy-path: Payment step offers all five payment methods', async ({ paymentPage }) => {
  await expect(paymentPage.paymentMethodSelect.locator('option')).toHaveText([
  'Choose your payment method', 'Bank Transfer', 'Cash on Delivery', 'Credit Card', 'Buy Now Pay Later', 'Gift Card',
]);
});

test('TS-02 - Happy-path: Shopper can place an order with Bank Transfer', async ({ paymentPage }) => {
  await paymentPage.selectPaymentMethod('bank-transfer');
  await expect(paymentPage.bankNameField).toBeEmpty();
  await expect(paymentPage.accountNameField).toBeEmpty();
  await expect(paymentPage.accountNumberField).toBeEmpty();

  // Fill in bank transfer details, check and confirm payment
  await paymentPage.fillBankTransferDetails('Bank of America', 'Jane Smith', '0012345678');
  await paymentPage.confirmPayment();

  // The order confirmation page should show an invoice number and the cart should be empty after the order is placed
  await expect(paymentPage.orderConfirmation).toContainText(/Your invoice number is \S+/);
  await paymentPage.page.goto('/checkout');
  await expect(paymentPage.cartItemTitles).toHaveCount(0);
});

// Selecting Cash on Delivery should hide any other detail fields (from other methods)
test('TS-03 - Happy-path: Shopper can place an order with Cash on Delivery', async ({ paymentPage }) => {
  // Select Cash on Delivery and check that other payment method fields are hidden
  await paymentPage.selectPaymentMethod('cash-on-delivery');
  await expect(paymentPage.bankNameField).toBeHidden();
  await expect(paymentPage.giftCardNumberField).toBeHidden();
  await expect(paymentPage.monthlyInstallmentsSelect).toBeHidden();

  await paymentPage.confirmPayment();

  await expect(paymentPage.orderConfirmation).toContainText(/Your invoice number is \S+/);
  await paymentPage.page.goto('/checkout');
  await expect(paymentPage.cartItemTitles).toHaveCount(0);
});

/*
test('TS-04 - Happy-path: Shopper can place an order with Credit Card', async ({ page }) => {
  // Test steps for placing an order with Credit Card
});

test('TS-05 - Happy-path: Shopper can place an order with Buy Now Pay Later', async ({ page }) => {
  // Test steps for placing an order with Buy Now Pay Later
});

test('TS-06 - Happy-path: Shopper can place an order with Gift Card', async ({ page }) => {
  // Test steps for placing an order with Gift Card
});

test('TS-07 - Happy-path: Each of the other offered numbers of monthly instalments is accepted', async ({ page }) => {
  // Test steps

});

*/

});

