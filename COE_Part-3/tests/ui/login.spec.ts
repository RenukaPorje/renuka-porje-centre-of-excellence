import { test, expect } from '@playwright/test';

// Credentials come from .env (see .env.example). Never hard-code them here.
const email = process.env.USER_EMAIL ?? '';
const password = process.env.USER_PASSWORD ?? '';

test.describe('Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/auth/login');
  });

  // test.fixme = "not written yet". Playwright skips it and lists it in the report.
  // Replace each test.fixme with test once you write the steps.

  test.fixme('logs in with valid credentials', async ({ page }) => {
    // fill email + password, click Login, expect the account page
  });

  test.fixme('shows an error for a wrong password', async ({ page }) => {
  });

  test.fixme('shows an error for an unregistered email', async ({ page }) => {
  });

  test.fixme('shows validation errors when fields are empty', async ({ page }) => {
  });
});
