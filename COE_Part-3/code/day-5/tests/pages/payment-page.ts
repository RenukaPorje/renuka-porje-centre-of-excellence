import { type Page, type Locator } from '@playwright/test';

export class PaymentPage {
  readonly page: Page;
  readonly cartProceedToCheckoutButton: Locator;
  readonly billingProceedToCheckoutButton: Locator;
  readonly signInProceedToCheckoutButton: Locator;
  readonly paymentMethodSelect: Locator;
  readonly checkPaymentButton: Locator;
  readonly confirmButton: Locator;
  readonly countrySelect: Locator;
  readonly postalCodeField: Locator;
  readonly houseNumberField: Locator;
  readonly giftCardNumberField: Locator;
  readonly giftCardValidationCodeField: Locator;
  readonly bankNameField: Locator;
  readonly accountNameField: Locator;
  readonly accountNumberField: Locator;
  readonly monthlyInstallmentsSelect: Locator;
  readonly paymentSuccessMessage: Locator;
  readonly orderConfirmation: Locator;
  readonly cartItemTitles: Locator;

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


  constructor(page: Page) {
    this.page = page;
    this.cartProceedToCheckoutButton = page.locator('[data-test="proceed-1"]');
    this.billingProceedToCheckoutButton = page.locator('[data-test="proceed-3"]');
    this.signInProceedToCheckoutButton = page.locator('[data-test="proceed-2"]');
    this.paymentMethodSelect = page.locator('[data-test="payment-method"]');
    this.checkPaymentButton = page.locator('[data-test="finish"]');
    this.confirmButton = page.locator('[data-test="finish"]');
    this.countrySelect = page.locator('[data-test="country"]');
    this.postalCodeField = page.locator('[data-test="postal_code"]');
    this.houseNumberField = page.locator('[data-test="house_number"]');
    this.giftCardNumberField = page.locator('[data-test="gift_card_number"]');
    this.giftCardValidationCodeField = page.locator('[data-test="validation_code"]');
    this.bankNameField = page.locator('[data-test="bank_name"]');
    this.accountNameField = page.locator('[data-test="account_name"]');
    this.accountNumberField = page.locator('[data-test="account_number"]');
    this.monthlyInstallmentsSelect = page.locator('[data-test="monthly_installments"]');
    this.paymentSuccessMessage = page.locator('[data-test="payment-success-message"]');
    this.orderConfirmation = page.getByText('Thanks for your order!');
    this.cartItemTitles = page.locator('[data-test="product-title"]');

  }

  // Opens the checkout and goes through the cart and sign in steps, so the Billing Address step is open
  async gotoBillingAddressStep() {
    await this.page.goto('/checkout');
    await this.cartProceedToCheckoutButton.click();
    await this.signInProceedToCheckoutButton.click();
  }

  // Fills the billing address form and proceeds to the payment step
  async fillBillingAddress(country: string, postalCode: string, houseNumber: string) {
    await this.countrySelect.selectOption(country);
    await this.postalCodeField.fill(postalCode);
    await this.houseNumberField.fill(houseNumber);
    await this.billingProceedToCheckoutButton.click();
  }

  async selectPaymentMethod(method: string) {
    await this.paymentMethodSelect.selectOption(method);
  }

  async fillBankTransferDetails(bankName: string, accountName: string, accountNumber: string) {
    await this.bankNameField.fill(bankName);
    await this.accountNameField.fill(accountName);
    await this.accountNumberField.fill(accountNumber);
  }

  // The first click checks the payment details and shows the success message, then the same button becomes Confirm and places the order
  async confirmPayment() {
    await this.checkPaymentButton.click();
    await this.paymentSuccessMessage.waitFor();
    await this.confirmButton.click();
  }
}

