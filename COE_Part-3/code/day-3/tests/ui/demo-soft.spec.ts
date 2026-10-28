import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';

/*
 * DEMO for the soft assertions exercise.
 * Both tests below use two wrong labels on purpose ('Cty' and 'Email adress'), so they fail when they run. This failure is intentional, 
 * to demonstrate the difference between plain expect and expect.soft.
 * They are commented out to keep the suite green. Uncomment to reproduce the results in the write-up:
 * plain expect stops at the first wrong label, and expect.soft reports both, without stopping at the first failure.
 */

/*
test.describe('soft assertions', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.gotoLogin();
  });

  test('plain expect: required fields on the registration page', async ({ page }) => {
    await expect(loginPage.registerLink).toBeVisible();
    await loginPage.clickRegisterLink();

    await expect(page).toHaveURL('/auth/register');
    await expect(page.getByRole('heading' , { name : 'Customer registration'})).toBeVisible();

    // Verifying all required fields are visible
    const requiredFields = [
      'First name', 'Last name', 'Date of Birth *', 'Cty', 'State', 'Postal code',
      'House number', 'Street', 'Country', 'Phone', 'Email adress', 'Password',
    ];

    for (const label of requiredFields) {
      await expect(page.getByLabel(label)).toBeVisible();
    }

  });

  test('soft assertions: required fields on the registration page', async ({ page }) => {
    await expect(loginPage.registerLink).toBeVisible();
    await loginPage.clickRegisterLink();

    await expect(page).toHaveURL('/auth/register');
    await expect(page.getByRole('heading' , { name : 'Customer registration'})).toBeVisible();

    // Verifying all required fields are visible
    const requiredFields = [
      'First name', 'Last name', 'Date of Birth *', 'Cty', 'State', 'Postal code',
      'House number', 'Street', 'Country', 'Phone', 'Email adress', 'Password',
    ];

    for (const label of requiredFields) {
      await expect.soft(page.getByLabel(label)).toBeVisible();
    }

  });
});
*/
