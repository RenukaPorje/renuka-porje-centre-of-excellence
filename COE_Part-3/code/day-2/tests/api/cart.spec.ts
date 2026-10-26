import { test, expect } from '@playwright/test';
import { addItemToCart, createCart, getProductId } from '../support/cart-api';

test.describe('Cart API', () => {

  test.describe('Positive', () => {

    test('GET /products returns a list of products', async ({ request }) => {
      const response = await request.get('/products');
      expect(response.status()).toBe(200);

      const body = await response.json();
      expect(body).toHaveProperty('current_page');
      expect(body).toHaveProperty('total');
      expect(body.data.length).toBeGreaterThan(0);

      for (const product of body.data) {
        expect(typeof product.id).toBe('string');
        expect(typeof product.name).toBe('string');
        expect(typeof product.price).toBe('number');
        expect(typeof product.description).toBe('string');
        expect(typeof product.is_rental).toBe('boolean');
        expect(typeof product.in_stock).toBe('boolean');
      }
    });

    test('POST /carts creates a cart and returns its id', async ({ request }) => {
      const response = await request.post('/carts');
      expect(response.status()).toBe(201);
      expect(response.headers()['content-type']).toContain('application/json');

      const body = await response.json();
      expect(body).toHaveProperty('id');
      expect(body.id).not.toBe('');
      expect(typeof body.id).toBe('string');
    });

    test('POST /carts/{id} adds a product to the cart', async ({ request }) => {
      const cartId = await createCart(request);
      const productId = await getProductId(request);
      const quantity = 1;

      const response = await request.post(`/carts/${cartId}`, {
        data: {
          product_id: productId,
          quantity: quantity
        }
      });
      expect(response.status()).toBe(200);
      expect(response.headers()['content-type']).toContain('application/json');

      const body = await response.json();
      expect(body).toHaveProperty('result');
      expect(body.result).toBe('item added or updated');

    });

    test('GET /carts/{id} returns the cart with the added item', async ({ request }) => {
      const cartId = await createCart(request);
      const productId = await getProductId(request);
      const quantity = 1;
      await addItemToCart(request, cartId, productId, quantity);

      const response = await request.get(`/carts/${cartId}`);
      expect(response.status()).toBe(200);
      expect(response.headers()['content-type']).toContain('application/json');

      const body = await response.json();
      expect(body.id).toBe(cartId);
      expect(body.cart_items).toHaveLength(1);

      const item = body.cart_items[0];
      expect(item.product_id).toBe(productId);
      expect(item.quantity).toBe(quantity);
      expect(typeof item.id).toBe('string');
      expect(typeof item.quantity).toBe('number');
      expect(typeof item.product.id).toBe('string');
      expect(typeof item.product.name).toBe('string');
      expect(typeof item.product.price).toBe('number');
      expect(typeof item.product.in_stock).toBe('boolean');
    });

    test('PUT /carts/{id}/product/quantity updates the quantity', async ({ request }) => {
      const cartId = await createCart(request);
      const productId = await getProductId(request);
      const initialQuantity = 1;
      await addItemToCart(request, cartId, productId, initialQuantity);

      const newQuantity = 3;
      const response = await request.put(`/carts/${cartId}/product/quantity`, {
        data: {
          product_id: productId,
          quantity: newQuantity
        }
      });
      expect(response.status()).toBe(200);
      expect(response.headers()['content-type']).toContain('application/json');

      const body = await response.json();
      expect(body).toHaveProperty('result');
      expect(body.result).toBe('item added or updated');

      // The message alone does not prove the change, so reading the cart again.
      const cartResponse = await request.get(`/carts/${cartId}`);
      expect(cartResponse.status()).toBe(200);
      const cart = await cartResponse.json();
      expect(cart.cart_items).toHaveLength(1);
      expect(cart.cart_items[0].quantity).toBe(newQuantity);
    });

    test('DELETE /carts/{id}/product/{productId} removes the item from the cart', async ({ request }) => {
      const cartId = await createCart(request);
      const productId = await getProductId(request);
      const quantity = 1;
      await addItemToCart(request, cartId, productId, quantity);

      const response = await request.delete(`/carts/${cartId}/product/${productId}`);
      expect(response.status()).toBe(204);
      expect(await response.text()).toBe('');

      // Reading the cart back to prove the item is gone.
      const cartResponse = await request.get(`/carts/${cartId}`);
      expect(cartResponse.status()).toBe(200);
      const cart = await cartResponse.json();
      expect(cart.cart_items).toHaveLength(0);
    });

    test('DELETE /carts/{id} deletes the cart', async ({ request }) => {
      const cartId = await createCart(request);
      const productId = await getProductId(request);
      const quantity = 1;
      await addItemToCart(request, cartId, productId, quantity);

      const response = await request.delete(`/carts/${cartId}`);
      expect(response.status()).toBe(204);
      expect(await response.text()).toBe('');

      // Reading the cart back to prove it no longer exists.
      const cartResponse = await request.get(`/carts/${cartId}`);
      expect(cartResponse.status()).toBe(404);
    });

  });

  test.describe('Negative', () => {
    const nonexistentCartId = '00000000-0000-0000-0000-000000000000';

    test('POST /carts/{id} without product_id returns 422', async ({ request }) => {
      const cartId = await createCart(request);
      const response = await request.post(`/carts/${cartId}`, {
        data: {
          quantity: 1 // Missing product_id
        }
      });
      expect(response.status()).toBe(422);

      // checking that the rejected request has not changed the cart.
      const cartResponse = await request.get(`/carts/${cartId}`);
      const cart = await cartResponse.json();
      expect(cart.cart_items).toHaveLength(0);
    });

    test('POST /carts/{id} with a non-integer quantity returns 422', async ({ request }) => {
      const cartId = await createCart(request);
      const productId = await getProductId(request);
      const response = await request.post(`/carts/${cartId}`, {
        data: {
          product_id: productId,
          quantity: 'abc' // Invalid quantity
        }
      });
      expect(response.status()).toBe(422);

      // checking that the rejected request has not changed the cart.
      const cartResponse = await request.get(`/carts/${cartId}`);
      const cart = await cartResponse.json();
      expect(cart.cart_items).toHaveLength(0);
    });

    test('PUT /carts/{id}/product/quantity without quantity returns 422', async ({ request }) => {
      const cartId = await createCart(request);
      const productId = await getProductId(request);
      await addItemToCart(request, cartId, productId, 1);

      const response = await request.put(`/carts/${cartId}/product/quantity`, {
        data: {
          product_id: productId // Missing quantity
        }
      });
      expect(response.status()).toBe(422);

      // checking that the rejected request has not changed the quantity.
      const cartResponse = await request.get(`/carts/${cartId}`);
      const cart = await cartResponse.json();
      expect(cart.cart_items).toHaveLength(1);
      expect(cart.cart_items[0].quantity).toBe(1);
    });

    test('GET /carts/{id} with a nonexistent id returns 404', async ({ request }) => {
      const response = await request.get(`/carts/${nonexistentCartId}`);
      expect(response.status()).toBe(404);

      const body = await response.json();
      expect(body).toHaveProperty('message');
      expect(body.message).toContain('Requested item not found');
    });

    test('DELETE /carts/{id} with a nonexistent id returns 404', async ({ request }) => {
      const response = await request.delete(`/carts/${nonexistentCartId}`);
      expect(response.status()).toBe(404);

      const body = await response.json();
      expect(body).toHaveProperty('message');
      expect(body.message).toContain('Cart doesnt exist');
    });

  });

});
