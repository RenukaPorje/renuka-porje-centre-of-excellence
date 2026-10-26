import { APIRequestContext, expect } from '@playwright/test';

// Test setup: creates an empty cart and returns its id.
export async function createCart(request: APIRequestContext): Promise<string> {
  const response = await request.post('/carts');
  expect(response.status()).toBe(201);

  const body = await response.json();
  return body.id;
}

// Test setup: returns the id of a real product, so no id has to be typed into a test.

export async function getProductId(request: APIRequestContext): Promise<string> {
  const response = await request.get('/products');
  expect(response.status()).toBe(200);

  const body = await response.json();
  const product = body.data.find((item: { name: string }) => item.name !== 'Thor Hammer'); // A cart only allows one Thor Hammer, so skipping it
  return product.id;
}

// Test setup: adds a product to a cart and checks that the API accepted it.
export async function addItemToCart(
  request: APIRequestContext,
  cartId: string,
  productId: string,
  quantity: number
): Promise<void> {
  const response = await request.post(`/carts/${cartId}`, {
    data: { product_id: productId, quantity: quantity }
  });
  expect(response.status()).toBe(200);
}
