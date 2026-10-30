import { request, type APIRequestContext } from '@playwright/test';

const API_URL = process.env.API_URL ?? 'https://api.practicesoftwaretesting.com';

export type Product = { id: string; name: string; price: number };

// API client to set up the test data directly, without going through the UI. It needs the Accept header, otherwise validation errors come back as a redirect and not as JSON.
export async function newApiContext(): Promise<APIRequestContext> {
  return request.newContext({
    baseURL: API_URL,
    extraHTTPHeaders: { Accept: 'application/json' },
  });
}

// Finds the product by its name using the API search, so the product id is never hardcoded in the tests (the ids change when the site data is reset).
export async function findProductByName(api: APIRequestContext, name: string): Promise<Product> {
  const response = await api.get('/products/search', { params: { q: name } });
  const body = await response.json();
  const product = body.data.find((item: Product) => item.name === name);
  if (!product) {
    throw new Error(`Product "${name}" was not found`);
  }
  return product;
}

// Creates an empty cart through the API and returns its id, which is needed to add the items to it.
export async function createCart(api: APIRequestContext): Promise<string> {
  const response = await api.post('/carts');
  if (response.status() !== 201) {
    throw new Error(`POST /carts returned ${response.status()}, expected 201`);
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
  const response = await api.post(`/carts/${cartId}`, {
    data: { product_id: productId, quantity },
  });
  if (response.status() !== 200) {
    throw new Error(`POST /carts/${cartId} returned ${response.status()}, expected 200`);
  }
}
