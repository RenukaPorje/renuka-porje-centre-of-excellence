import { APIRequestContext, expect } from '@playwright/test';

// Test setup: registers a new customer through the API, so no registration form is needed
export async function registerCustomer(
  apiRequestContext: APIRequestContext,
  customerEmail: string,
  customerPassword: string
): Promise<void> {
  const apiResponse = await apiRequestContext.post(`${process.env.API_URL}/users/register`, {
    headers: { Accept: 'application/json' },
    data: {
      first_name: 'Jane',
      last_name: 'Callahan',
      email: customerEmail,
      password: customerPassword,
    },
  });

  expect(apiResponse.status()).toBe(201);
}

// Test setup: one wrong-password login through the API, so the server counts a failed attempt
export async function createFailedAttempt(
  apiRequestContext: APIRequestContext,
  customerEmail: string,
  wrongPassword: string
): Promise<void> {
  const apiResponse = await apiRequestContext.post(`${process.env.API_URL}/users/login`, {
    headers: { Accept: 'application/json' },
    data: {
      email: customerEmail,
      password: wrongPassword,
    },
  });

  // A wrong password is a client error. A 5xx would mean the server never handled the attempt
  expect(apiResponse.status()).toBeGreaterThanOrEqual(400);
  expect(apiResponse.status()).toBeLessThan(500);
}
