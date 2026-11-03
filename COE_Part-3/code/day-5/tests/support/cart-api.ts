import { type APIRequestContext } from '@playwright/test';

const API_URL = 'https://api.practicesoftwaretesting.com';

export type Product = { id: string; name: string; price: number };

// Finds the product by name through the API. If the product is not found, an error is thrown, so the scenario fails at the setup and not later on.
export async function findProductByName(api: APIRequestContext, name: string): Promise<Product> {
  const response = await api.get(`${API_URL}/products/search`, {
    headers: { Accept: 'application/json' },
    params: { q: name },
  });
  if (response.status() !== 200) {
    throw new Error(`GET ${API_URL}/products/search returned ${response.status()}, expected 200: ${await response.text()}`);
  }
  const body = await response.json();
  const product = body.data.find((item: Product) => item.name === name);
  if (!product) {
    throw new Error(`Product "${name}" was not found`);
  }
  return product;
}

// Creates an empty cart through the API and returns its id, which is needed to add the items to it.
export async function createCart(api: APIRequestContext): Promise<string> {
  const response = await api.post(`${API_URL}/carts`, {
    headers: { Accept: 'application/json' },
  });
  if (response.status() !== 201) {
    throw new Error(`POST ${API_URL}/carts returned ${response.status()}, expected 201: ${await response.text()}`);
  }
  const body = await response.json();
  return body.id;
}

// Adds the product to that cart through the API. If the API does not accept it, an error is thrown, so the scenario fails at the setup and not later on.
export async function addItemToCart(
  api: APIRequestContext,
  cartId: string,
  productId: string,
  quantity: number
): Promise<void> {
  const response = await api.post(`${API_URL}/carts/${cartId}`, {
    headers: { Accept: 'application/json' },
    data: { product_id: productId, quantity },
  });
  if (response.status() !== 200) {
    throw new Error(`POST ${API_URL}/carts/${cartId} returned ${response.status()}, expected 200: ${await response.text()}`);
  }
}

// Returns the status of GET /carts/{id}. The app deletes the cart when the order is placed, so after an order this is 404.
export async function getCartStatus(api: APIRequestContext, cartId: string): Promise<number> {
  const response = await api.get(`${API_URL}/carts/${cartId}`, {
    headers: { Accept: 'application/json' },
  });
  return response.status();
}
