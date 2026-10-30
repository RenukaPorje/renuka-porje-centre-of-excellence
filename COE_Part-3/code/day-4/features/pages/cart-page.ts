import { type Page, type Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartTotal: Locator;
  readonly itemName: Locator;
  readonly emptyCartMessage: Locator;
  readonly proceedToCheckoutButton: Locator;
  readonly quantityUpdatedMessage: Locator;
  readonly maxQuantityWarningMessage: Locator;
  readonly itemRemovedMessage: Locator;


  constructor(page: Page) {
    this.page = page;
    this.cartTotal = this.page.locator('[data-test="cart-total"]');
    this.itemName = this.page.locator('[data-test="product-title"]');
    this.emptyCartMessage = this.page.getByText('The cart is empty. Nothing to display.');
    this.proceedToCheckoutButton = this.page.getByRole('button', { name: 'Proceed to checkout' });
    this.quantityUpdatedMessage = this.page.getByRole('alert').filter({ hasText: 'Product quantity updated.' });
    this.maxQuantityWarningMessage = this.page.getByRole('alert').filter({ hasText: 'you can order at most 99 of this product.' });
    this.itemRemovedMessage = this.page.getByRole('alert').filter({ hasText: 'Product deleted.' });
  }

  // The quantity box is found by its label, which has the product name in it (Quantity for <product name>), so it works for any product.
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

  // The row of one product. It is found by the exact name in its product cell (found it with the help of codegen).
  row(productName: string): Locator {
    return this.page.getByRole('row').filter({ has: this.page.getByRole('cell', { name: productName, exact: true }) });
  }

  // Price and line total are searched inside that product's row only, so the other items in the cart do not interfere.
  unitPrice(productName: string): Locator {
    return this.row(productName).locator('[data-test="product-price"]');
  }

  lineTotal(productName: string): Locator {
    return this.row(productName).locator('[data-test="line-price"]');
  }

  // As the delete icon has no role, label or text, it is found by class inside that row.
  async deleteItem(productName: string) {
    await this.row(productName).locator('.btn.btn-danger').click();
  }

}
