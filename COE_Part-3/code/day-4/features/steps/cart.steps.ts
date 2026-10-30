import {Given, When, Then} from '@cucumber/cucumber';
import {CustomWorld} from '../support/world';
import { addItemToCart, createCart, findProductByName, newApiContext } from '../support/cart-api';
import { CartPage } from '../pages/cart-page';
import { expect } from '@playwright/test';

Given(/^the shopper’s cart holds (\d+) (.+) priced at \$(\d+\.\d{2})$/,
  async function (this: CustomWorld, quantity: string, productName: string, price: string) {
    const api = await newApiContext();
    const product = await findProductByName(api, productName);
    if (product.price !== Number(price)) {
      throw new Error(`${productName} costs ${product.price} on Toolshop, but the scenario says ${price}`);
    }

    this.productName = product.name;
    this.quantity = Number(quantity);
    this.unitPrice = product.price;

    const cartId = await createCart(api);
    await addItemToCart(api, cartId, product.id, Number(quantity));
    await this.page.goto('/');
    await this.page.evaluate((id) => sessionStorage.setItem('cart_id', id), cartId);
    await api.dispose();
  }
);

When('the shopper views the cart', async function (this: CustomWorld) {
  const cartPage = new CartPage(this.page);
  await cartPage.gotoCart();
});

Then('the cart total should be ${float}', async function (this: CustomWorld, total: number) {
  const cartPage = new CartPage(this.page);
  await expect(cartPage.cartTotal).toHaveText(`$${total.toFixed(2)}`);
});

Then('the cart should show the item’s name, quantity, unit price and line total', async function (this: CustomWorld) {
  const cartPage = new CartPage(this.page);
  await expect(cartPage.itemName).toHaveText(this.productName);
  await expect(cartPage.quantityInput(this.productName)).toHaveValue(String(this.quantity));
  await expect(cartPage.itemUnitPrice).toHaveText(`$${this.unitPrice.toFixed(2)}`);
  await expect(cartPage.lineTotal).toHaveText(`$${(this.quantity * this.unitPrice).toFixed(2)}`);
});

Given('the shopper does not have any items in the cart', async function (this: CustomWorld) {
  const api = await newApiContext();
  const cartId = await createCart(api);
  await this.page.goto('/');
  await this.page.evaluate((id) => sessionStorage.setItem('cart_id', id), cartId);
  await api.dispose();
});

Then('the shopper should be told that the cart is empty', async function (this: CustomWorld) {
  const cartPage = new CartPage(this.page);
  await expect(cartPage.emptyCartMessage).toBeVisible();
});

Then('checkout should be unavailable', async function (this: CustomWorld) {
  const cartPage = new CartPage(this.page);
  await expect(cartPage.proceedToCheckoutButton).toHaveCount(0);
});

When('the shopper changes the quantity from {int} to {int}', async function (this: CustomWorld, oldQuantity: number, newQuantity: number) {
  const cartPage = new CartPage(this.page);
  await cartPage.gotoCart();
  await expect(cartPage.quantityInput(this.productName)).toHaveValue(String(oldQuantity));
  await cartPage.setQuantity(this.productName, newQuantity);
  this.quantity = newQuantity;
});

Then('the item total and cart total should be ${float}', async function (this: CustomWorld, statedTotal: number) {
  const cartPage = new CartPage(this.page);
  const calculatedTotal = this.quantity * this.unitPrice;
  if (calculatedTotal.toFixed(2) !== statedTotal.toFixed(2)) {
    throw new Error(`The scenario says the total is ${statedTotal.toFixed(2)}, but ${this.quantity} x ${this.unitPrice} is ${calculatedTotal.toFixed(2)}`);
  }
  await expect(cartPage.lineTotal).toHaveText(`$${statedTotal.toFixed(2)}`);
  await expect(cartPage.cartTotal).toHaveText(`$${statedTotal.toFixed(2)}`);
});

Then('the shopper should see a confirmation that the quantity was updated', async function (this: CustomWorld) {
  const cartPage = new CartPage(this.page);
  await expect(cartPage.quantityUpdatedMessage).toBeVisible();
});

Given(/^the shopper’s cart holds (.+) priced at \$\d+\.\d{2} and (.+) priced at \$\d+\.\d{2}$/,
  async function (this: CustomWorld, firstProductName: string, secondProductName: string) {
    const api = await newApiContext();
    const firstProduct = await findProductByName(api, firstProductName);
    const secondProduct = await findProductByName(api, secondProductName);

    const cartId = await createCart(api);
    await addItemToCart(api, cartId, firstProduct.id, 1);
    await addItemToCart(api, cartId, secondProduct.id, 1);
    await this.page.goto('/');
    await this.page.evaluate((id) => sessionStorage.setItem('cart_id', id), cartId);
    await api.dispose();
  }
);

Then('the quantity should reset to {int}', async function (this: CustomWorld, resetQuantity: number) {
  const cartPage = new CartPage(this.page);
  await expect(cartPage.quantityInput(this.productName)).toHaveValue(String(resetQuantity));
  this.quantity = resetQuantity;
});

When(/^the shopper deletes the (.+)$/, async function (this: CustomWorld, productName: string) {
  const cartPage = new CartPage(this.page);
  await cartPage.gotoCart();
  await cartPage.deleteItem(productName);
});

Then(/^the cart should hold only the (.+)$/, async function (this: CustomWorld, remainingProductName: string) {
  const cartPage = new CartPage(this.page);
  await expect(cartPage.itemName).toHaveText([remainingProductName]);
});

Then('the shopper should see a confirmation that the item was removed', async function (this: CustomWorld) {
  const cartPage = new CartPage(this.page);
  await expect(cartPage.itemRemovedMessage).toBeVisible();
});
