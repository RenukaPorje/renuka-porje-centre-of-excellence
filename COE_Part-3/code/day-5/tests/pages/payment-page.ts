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

    // Credit card method
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

