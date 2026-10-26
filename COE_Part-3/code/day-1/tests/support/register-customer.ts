import { Page, expect } from '@playwright/test';

// Test setup: registers a customer through the registration page
export async function registerCustomer(page: Page, customerEmail: string, customerPassword: string) {
  await page.goto('/auth/register');
  await page.getByLabel('First name').fill('Test');
  await page.getByLabel('Last name').fill('Customer');
  await page.getByLabel('Date of Birth').fill('1990-05-15');
  await page.getByLabel('Country').selectOption('US');
  await page.getByLabel('Postal code').fill('10001');

  // Country, postal code and house number start an address lookup that fills street, city and state.
  // Wait for it, otherwise it can overwrite what is typed next.
  const addressLookup = page.waitForResponse((response) => response.url().includes('/postcode-lookup'));
  await page.getByLabel('House number').fill('42');
  await addressLookup;
  await page.getByLabel('Street').fill('Test Street');
  await page.getByLabel('City').fill('Test City');
  await page.getByLabel('State').fill('Test State');
  await page.getByLabel('Phone').fill('0612345678');
  await page.getByLabel('Email address').fill(customerEmail);
  
  // The label points at the custom password component, not the input, so use data-test.
  await page.locator('[data-test="password"]').fill(customerPassword);
  await page.getByRole('button', { name: 'Register' }).click();
  await expect(page).toHaveURL('/auth/login');
}
