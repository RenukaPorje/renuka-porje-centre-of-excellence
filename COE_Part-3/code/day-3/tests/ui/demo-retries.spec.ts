import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { AccountPage } from '../pages/account-page';

const email = process.env.USER_EMAIL ?? '';
const password = process.env.USER_PASSWORD ?? '';
const fullName = process.env.USER_FULL_NAME ?? '';

/*
 * DEMO for the retries exercise.
 * The first test below is an unchanged copy of TC_01 and passes. The other two are copies of TC_01 where only the wait on
 * the customer name check is shortened, so they fail on purpose: one every time (1 ms) and one only some of the time (200 ms).
 * They are commented out to keep the suite green. Uncomment to reproduce the results in the write-up
 */

// All three tests are copies of TC_01. The only difference is how long the customer name check waits.
test.describe('demo: retries', () => {
  let loginPage: LoginPage;
  let accountPage: AccountPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    accountPage = new AccountPage(page, fullName);
    await loginPage.gotoLogin();
  });

  // Copy of TC_01, unchanged, every check waits the default 5 seconds. Expected: passes every time.
  test('demo: passes every time', async ({ page }) => {
    await expect(loginPage.heading).toBeVisible();

    await loginPage.fillEmail(email);
    await loginPage.fillPassword(password);

    await expect(loginPage.loginButton).toBeVisible();
    await loginPage.clickLoginButton();

    await expect(page).toHaveURL('/account');
    await expect(accountPage.heading).toBeVisible();

    await expect(accountPage.customerNameButton).toBeVisible();

    await expect(loginPage.signInLink).toBeHidden();
  });

  /*
  // Copy of TC_01 where the customer name check waits 1 ms. The name is not on the page the instant the click returns, so this should fail on every attempt.
  test('demo: fails on every attempt', async ({ page }) => {
    await expect(loginPage.heading).toBeVisible();

    await loginPage.fillEmail(email);
    await loginPage.fillPassword(password);

    await expect(loginPage.loginButton).toBeVisible();
    await loginPage.clickLoginButton();

    await expect(page).toHaveURL('/account');
    await expect(accountPage.heading).toBeVisible();

    await expect(accountPage.customerNameButton).toBeVisible({ timeout: 1 });

    await expect(loginPage.signInLink).toBeHidden();
  });

  // Copy of TC_01 where the customer name check waits 200 ms.The timing varies, so some runs pass and some do not.
  // Expected: sometimes flaky.
  test('demo: flaky login redirect', async ({ page }) => {
    await expect(loginPage.heading).toBeVisible();

    await loginPage.fillEmail(email);
    await loginPage.fillPassword(password);

    await expect(loginPage.loginButton).toBeVisible();
    await loginPage.clickLoginButton();

    await expect(page).toHaveURL('/account');
    await expect(accountPage.heading).toBeVisible();

    await expect(accountPage.customerNameButton).toBeVisible({ timeout: 200 });

    await expect(loginPage.signInLink).toBeHidden();
  });
  */
});
