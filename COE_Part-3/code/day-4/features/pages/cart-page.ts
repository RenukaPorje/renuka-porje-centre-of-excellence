import { type Page, type Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartTotal: Locator;
  readonly itemName: Locator;
  readonly itemUnitPrice: Locator;
  readonly lineTotal: Locator;
  readonly emptyCartMessage: Locator;
  readonly proceedToCheckoutButton: Locator;
  readonly quantityUpdatedMessage: Locator;
  readonly itemRemovedMessage: Locator;


  constructor(page: Page) {
    this.page = page;
    this.cartTotal = this.page.locator('[data-test="cart-total"]');
    this.itemName = this.page.locator('[data-test="product-title"]');
    this.itemUnitPrice = this.page.locator('[data-test="product-price"]');
    this.lineTotal = this.page.locator('[data-test="line-price"]');
    this.emptyCartMessage = this.page.getByText('The cart is empty. Nothing to display.');
    this.proceedToCheckoutButton = this.page.getByRole('button', { name: 'Proceed to checkout' });
    this.quantityUpdatedMessage = this.page.getByRole('alert').filter({ hasText: 'Product quantity updated.' });
    this.itemRemovedMessage = this.page.getByRole('alert').filter({ hasText: 'Product deleted.' });
  }

  // The quantity box is a form control labelled with the product name.
  quantityInput(productName: string): Locator {
    return this.page.getByLabel(`Quantity for ${productName}`);
  }

  // Navigate to the cart page (replacing the goto in beforeEach in tests)
  async gotoCart() {
    await this.page.goto('/checkout');
  }

  async setQuantity(productName: string, quantity: number) {
    const input = this.quantityInput(productName);
    await input.fill(String(quantity));
    await input.press('Tab');
  }

  // The row is found by the exact name in its product cell. The delete icon has no role,
  // label or text (Playwright's codegen also falls back to its class), so it is found by class inside that row.
  async deleteItem(productName: string) {
    const row = this.page.getByRole('row').filter({ has: this.page.getByRole('cell', { name: productName, exact: true }) });
    await row.locator('.btn.btn-danger').click();
  }

}
