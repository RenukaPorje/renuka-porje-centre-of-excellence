import {Given, When, Then} from '@cucumber/cucumber';
import {CustomWorld} from '../support/world';
import { addItemToCart, createCart, findProductByName, newApiContext } from '../support/cart-api';
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
    await this.giveBrowserTheCart(cartId);
    await api.dispose();
  }
);

When('the shopper views the cart', async function (this: CustomWorld) {
  await this.cartPage.gotoCart();
});

Then('the cart total should be ${float}', async function (this: CustomWorld, total: number) {
  await expect(this.cartPage.cartTotal).toHaveText(`$${total.toFixed(2)}`);
});

Then('the cart should show the item’s name, quantity, unit price and line total', async function (this: CustomWorld) {
  await expect(this.cartPage.row(this.productName)).toBeVisible();
  await expect(this.cartPage.quantityInput(this.productName)).toHaveValue(String(this.quantity));
  await expect(this.cartPage.unitPrice(this.productName)).toHaveText(`$${this.unitPrice.toFixed(2)}`);
  await expect(this.cartPage.lineTotal(this.productName)).toHaveText(`$${(this.quantity * this.unitPrice).toFixed(2)}`);
});

Given('the shopper does not have any items in the cart', async function (this: CustomWorld) {
  const api = await newApiContext();
  const cartId = await createCart(api);
  await this.giveBrowserTheCart(cartId);
  await api.dispose();
});

Then('the shopper should be told that the cart is empty', async function (this: CustomWorld) {
  await expect(this.cartPage.emptyCartMessage).toBeVisible();
});

Then('checkout should be unavailable', async function (this: CustomWorld) {
  await expect(this.cartPage.proceedToCheckoutButton).toHaveCount(0);
});

When('the shopper changes the quantity from {int} to {int}', async function (this: CustomWorld, oldQuantity: number, newQuantity: number) {
  await this.cartPage.gotoCart();
  await expect(this.cartPage.quantityInput(this.productName)).toHaveValue(String(oldQuantity));
  await this.cartPage.setQuantity(this.productName, newQuantity);
  this.quantity = newQuantity;
});

Then('the shopper should be warned that the maximum quantity is 99', async function (this: CustomWorld) {
  await expect(this.cartPage.maxQuantityWarningMessage).toBeVisible();
});

Then('the item total and cart total should be ${float}', async function (this: CustomWorld, statedTotal: number) {
  const calculatedTotal = this.quantity * this.unitPrice;
  if (calculatedTotal.toFixed(2) !== statedTotal.toFixed(2)) {
    throw new Error(`The scenario says the total is ${statedTotal.toFixed(2)}, but ${this.quantity} x ${this.unitPrice} is ${calculatedTotal.toFixed(2)}`);
  }
  await expect(this.cartPage.lineTotal(this.productName)).toHaveText(`$${statedTotal.toFixed(2)}`);
  await expect(this.cartPage.cartTotal).toHaveText(`$${statedTotal.toFixed(2)}`);
});

Then('the shopper should see a confirmation that the quantity was updated', async function (this: CustomWorld) {
  await expect(this.cartPage.quantityUpdatedMessage).toBeVisible();
});

Given(/^the shopper’s cart holds (.+) priced at \$(\d+\.\d{2}) and (.+) priced at \$(\d+\.\d{2})$/,
  async function (this: CustomWorld, firstProductName: string, firstStatedPrice: string, secondProductName: string, secondStatedPrice: string) {
    const api = await newApiContext();
    const firstProduct = await findProductByName(api, firstProductName);
    const secondProduct = await findProductByName(api, secondProductName);
    if (firstProduct.price !== Number(firstStatedPrice)) {
      throw new Error(`${firstProductName} costs ${firstProduct.price} on Toolshop, but the scenario says ${firstStatedPrice}`);
    }
    if (secondProduct.price !== Number(secondStatedPrice)) {
      throw new Error(`${secondProductName} costs ${secondProduct.price} on Toolshop, but the scenario says ${secondStatedPrice}`);
    }

    const cartId = await createCart(api);
    await addItemToCart(api, cartId, firstProduct.id, 1);
    await addItemToCart(api, cartId, secondProduct.id, 1);
    await this.giveBrowserTheCart(cartId);
    await api.dispose();
  }
);

Then('the quantity should reset to {int}', async function (this: CustomWorld, resetQuantity: number) {
  await expect(this.cartPage.quantityInput(this.productName)).toHaveValue(String(resetQuantity));
  this.quantity = resetQuantity;
});

When(/^the shopper deletes the (.+)$/, async function (this: CustomWorld, productName: string) {
  await this.cartPage.gotoCart();
  await this.cartPage.deleteItem(productName);
});

Then(/^the cart should hold only the (.+)$/, async function (this: CustomWorld, remainingProductName: string) {
  await expect(this.cartPage.itemName).toHaveText([remainingProductName]);
});

Then('the shopper should see a confirmation that the item was removed', async function (this: CustomWorld) {
  await expect(this.cartPage.itemRemovedMessage).toBeVisible();
});
