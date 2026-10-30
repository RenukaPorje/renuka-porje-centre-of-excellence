import { request, type APIRequestContext } from '@playwright/test';

const API_URL = process.env.API_URL ?? 'https://api.practicesoftwaretesting.com';

export type Product = { id: string; name: string; price: number };

// Creates the API client used for test setup.
export async function newApiContext(): Promise<APIRequestContext> {
  return request.newContext({
    baseURL: API_URL,
    extraHTTPHeaders: { Accept: 'application/json' },
  });
}

// Test setup: finds a product by its name, using the API's search.
export async function findProductByName(api: APIRequestContext, name: string): Promise<Product> {
  const response = await api.get('/products/search', { params: { q: name } });
  const body = await response.json();
  const product = body.data.find((item: Product) => item.name === name);
  if (!product) {
    throw new Error(`Product "${name}" was not found`);
  }
  return product;
}

// Test setup: creates an empty cart and returns its id
export async function createCart(api: APIRequestContext): Promise<string> {
  const response = await api.post('/carts');
  if (response.status() !== 201) {
    throw new Error(`POST /carts returned ${response.status()}, expected 201`);
  }
  const body = await response.json();
  return body.id;
}

// Test setup: adds a product to a cart and checks that the API accepted it
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
