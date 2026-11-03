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
  readonly creditCardNumberField: Locator;
  readonly expirationDateField: Locator;
  readonly cvvField: Locator;
  readonly cardHolderNameField: Locator;
  readonly cardNumberHelpText: Locator;
  readonly cvvHelpText: Locator;
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
    // The three Proceed to checkout buttons have the same name, so only their test ids tell the steps apart
    this.cartProceedToCheckoutButton = page.locator('[data-test="proceed-1"]');
    this.billingProceedToCheckoutButton = page.locator('[data-test="proceed-3"]');
    this.signInProceedToCheckoutButton = page.locator('[data-test="proceed-2"]');
    this.paymentMethodSelect = page.getByRole('combobox', { name: 'Payment Method' });
    this.checkPaymentButton = page.getByRole('button', { name: 'Check payment' });
    this.confirmButton = page.getByRole('button', { name: 'Confirm' });
    this.countrySelect = page.getByRole('combobox', { name: 'Your country' });
    this.postalCodeField = page.getByRole('textbox', { name: 'Your Postcode' });
    this.houseNumberField = page.getByRole('textbox', { name: 'e.g. 42' });
    this.giftCardNumberField = page.getByRole('textbox', { name: 'Gift Card Number' });
    this.giftCardValidationCodeField = page.getByRole('textbox', { name: 'Validation Code' });
    this.bankNameField = page.getByRole('textbox', { name: 'Bank Name' });
    this.accountNameField = page.getByRole('textbox', { name: 'Account Name' });
    this.accountNumberField = page.getByRole('textbox', { name: 'Account Number' });
    this.monthlyInstallmentsSelect = page.getByRole('combobox', { name: 'Monthly Installments' });
    this.paymentSuccessMessage = page.getByText('Payment was successful');
    //Actual UI message: Thanks for your order! Your invoice number is INV-2026000011.
    this.orderConfirmation = page.getByText('Thanks for your order! Your invoice number is INV');
    this.cartItemTitles = page.locator('[data-test="product-title"]');

     //Credit cart method
    this.creditCardNumberField = page.getByRole('textbox', { name: 'Credit Card Number' });
    this.cardNumberHelpText = page.getByText('Enter your 16-digit credit card number as it appears on the card');
    this.expirationDateField = page.getByRole('textbox', { name: 'Expiration Date' });
    this.cvvField = page.getByRole('textbox', { name: 'CVV' });
    this.cvvHelpText = page.getByText('The CVV is a 3-digit or 4-digit number');
    this.cardHolderNameField = page.getByRole('textbox', { name: 'Card Holder Name' });


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

  // The first click checks the payment details and shows the success message. The button then changes to Confirm, so it is found by its name, which makes Playwright wait for the change before clicking and placing the order
  async confirmPayment() {
    await this.checkPaymentButton.click();
    await this.paymentSuccessMessage.waitFor();
    await this.confirmButton.click();
  }
}

