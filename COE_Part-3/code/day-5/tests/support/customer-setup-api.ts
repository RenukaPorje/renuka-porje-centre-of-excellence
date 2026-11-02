import { APIRequestContext } from '@playwright/test';

const API_URL = process.env.API_URL || 'https://api.practicesoftwaretesting.com';

// Test setup: registers a new customer through the API, so no customer registration through UI is needed
export async function registerCustomer(
  apiRequestContext: APIRequestContext,
  customerEmail: string,
  customerPassword: string
): Promise<void> {
  const apiResponse = await apiRequestContext.post(`${API_URL}/users/register`, {
    headers: { Accept: 'application/json' },
    data: {
      first_name: 'Jane',
      last_name: 'Callahan',
      email: customerEmail,
      password: customerPassword,
      dob: '1990-01-01',
      phone: '123-456-7890',
      address: {
        street: '123 Main St',
        house_number: 'Apt 4B',
        city: 'Anytown',
        state: 'CA',
        postal_code: '12345',
        country: 'US',
      },
    },
  });

  if (apiResponse.status() !== 201) {
    throw new Error(`POST ${API_URL}/users/register returned ${apiResponse.status()}, expected 201: ${await apiResponse.text()}`);
  }
}

// Test setup: login a customer through the API, so no login through UI is needed
export async function loginCustomer(
  apiRequestContext: APIRequestContext,
  customerEmail: string,
  customerPassword: string
): Promise<string> {
  const apiResponse = await apiRequestContext.post(`${API_URL}/users/login`, {
    headers: { Accept: 'application/json' },
    data: {
      email: customerEmail,
      password: customerPassword,
    },
  });

  if (apiResponse.status() !== 200) {
    throw new Error(`POST ${API_URL}/users/login returned ${apiResponse.status()}, expected 200: ${await apiResponse.text()}`);
  }
  const responseBody = await apiResponse.json();
  return responseBody.access_token;
}