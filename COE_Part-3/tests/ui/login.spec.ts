import { test, expect } from '@playwright/test';

// Credentials come from .env (see .env.example). Never hard-code them here.
const email = process.env.USER_EMAIL ?? '';
const password = process.env.USER_PASSWORD ?? '';
const fullName = process.env.USER_FULL_NAME ?? '';

test.describe('Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/auth/login');
  });

  test('TC_01: logs in with valid credentials', async ({ page }) => {
    const loginHeading = page.getByRole('heading', { name : 'Login'});
    await expect(loginHeading).toBeVisible();

    await page.getByLabel('Email address').fill(email);
    await page.getByLabel('Password *', { exact: true }).fill(password);

    const loginButton = page.getByRole('button', { name : 'Login'});
    await expect(loginButton).toBeVisible();
    await loginButton.click();

    await expect(page).toHaveURL('/account');
    await expect(page.getByRole('heading', { name : 'My account', exact: true })).toBeVisible();

    const customerNameButton = page.getByRole('button', { name: fullName, exact: true });
    await expect(customerNameButton).toBeVisible();

    const signInLink = page.getByRole('link', { name: 'Sign in', exact: true });
    await expect(signInLink).toBeHidden();
  });

  test.fixme('shows an error for a wrong password', async ({ page }) => {
  });

  test.fixme('shows an error for an unregistered email', async ({ page }) => {
  });

  test.fixme('shows validation errors when fields are empty', async ({ page }) => {
  });
});
