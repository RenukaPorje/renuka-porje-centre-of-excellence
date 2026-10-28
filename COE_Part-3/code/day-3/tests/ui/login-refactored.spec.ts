import { test, expect } from '@playwright/test';
import { registerCustomer, createFailedAttempt } from '../support/register-customer';
import { LoginPage } from '../pages/login-page';
import { AccountPage } from '../pages/account-page';

const email = process.env.USER_EMAIL ?? '';
const password = process.env.USER_PASSWORD ?? '';
const fullName = process.env.USER_FULL_NAME ?? '';

test.describe('Login', () => {
  let loginPage : LoginPage;
  let accountPage : AccountPage;
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    accountPage = new AccountPage(page, fullName);
    await loginPage.gotoLogin();
  });

  
  test('TC_01: logs in with valid credentials', async ({ page }) => {
    
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

  //Verify that the register link opens the registration page and all required fields are visible
  test('TC_12: Register link opens the registration page', async ({ page }) => {
   
    await expect(loginPage.registerLink).toBeVisible();
    await loginPage.clickRegisterLink();

    await expect(page).toHaveURL('/auth/register');
    await expect(page.getByRole('heading' , { name : 'Customer registration'})).toBeVisible();

    // Verifying all required fields are visible
    await expect(page.getByLabel('First name')).toBeVisible();
    await expect(page.getByLabel('Last name')).toBeVisible();
    await expect(page.getByLabel('Date of Birth *')).toBeVisible();
    await expect(page.getByLabel('City')).toBeVisible();
    await expect(page.getByLabel('State')).toBeVisible();
    await expect(page.getByLabel('Postal code')).toBeVisible();
    await expect(page.getByLabel('House number')).toBeVisible();
    await expect(page.getByLabel('Street')).toBeVisible();
    await expect(page.getByLabel('Country')).toBeVisible();
    await expect(page.getByLabel('Phone')).toBeVisible();
    await expect(page.getByLabel('Email address')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();

    // Verify that the "Register" button is visible and enabled
    const registerButton = page.getByRole('button', { name : 'Register'});
    await expect(registerButton).toBeVisible();
    await expect(registerButton).toBeEnabled();
  });

  //Verify that the Forgot your Password? link opens the forgot password page and all required fields are visible
  test('TC_13: Forgot password link opens the forgot password page', async ({ page }) => {
    await expect(loginPage.forgotPasswordLink).toBeVisible();
    await loginPage.clickForgotPassword();

    await expect(page).toHaveURL('/auth/forgot-password');
    await expect(page.getByRole('heading' , { name : 'Forgot Password'})).toBeVisible();

    // Verify that the email field is visible
    await expect(page.getByLabel('Email address')).toBeVisible();

    // Verify that the "Set New Password" button is visible and enabled
    const setNewPassword = page.getByRole('button', { name : 'Set New Password'});
    await expect(setNewPassword).toBeVisible();
    await expect(setNewPassword).toBeEnabled();
  });

  //Negative test cases
  //refactored to use POM
  test('TC_10: Login with the password left empty', async ({ page }) => {
    await expect(loginPage.heading).toBeVisible();

    await loginPage.fillEmail(email);
    await loginPage.clickLoginButton();

    // The message must be attached to the Password field, so checking it on the field itself.
    await expect(loginPage.passwordField).toHaveAccessibleDescription('Password is required');
    await expect(loginPage.emailError).not.toBeVisible();

    await expect(page).toHaveURL('/auth/login');
  });

  //refactored to use POM
  test('TC_11: Login with the email left empty', async ({ page }) => {
    await expect(loginPage.heading).toBeVisible();

    await loginPage.passwordField.fill(password);
    await loginPage.clickLoginButton();

    await expect(loginPage.emailField).toHaveAccessibleDescription('Email is required');
    await expect(loginPage.passwordError).not.toBeVisible();

    await expect(page).toHaveURL('/auth/login');
  });

  //refactored to use POM
  test('TC_05: Login with the email and password left empty', async ({ page }) => {

    await expect(loginPage.heading).toBeVisible();

    await loginPage.clickLoginButton();

    await expect(loginPage.emailField).toHaveAccessibleDescription('Email is required');
    await expect(loginPage.passwordField).toHaveAccessibleDescription('Password is required');

    await expect(page).toHaveURL('/auth/login');
  });

  //refactored to use POM
  test('TC_06: Login with the email in the wrong format', async ({ page }) => {
    // Invalid partition: an email with no @ sign. The login form's validator rejects it.
    const emailWithoutAt = 'abc';
    await expect(loginPage.heading).toBeVisible();

    await loginPage.fillEmail(emailWithoutAt);
    await loginPage.fillPassword(password);
    await loginPage.clickLoginButton();

    await expect(loginPage.emailField).toHaveAccessibleDescription('Email format is invalid');

    await expect(loginPage.passwordError).not.toBeVisible();

    await expect(page).toHaveURL('/auth/login');
  });

  //refactored to use POM
  test('TC_07: Login with an unregistered email', async ({ page }) => {
    // Unique for each run, on example.com (reserved), so no customer can have registered it
    const unregisteredEmail = `no.such.user.${Date.now()}@example.com`;
    await expect(loginPage.heading).toBeVisible();

    await loginPage.fillEmail(unregisteredEmail);
    await loginPage.fillPassword(password);
    await loginPage.clickLoginButton();

    await expect(loginPage.invalidLoginError).toBeVisible();
    await expect(page).toHaveURL('/auth/login');
  });

  test('TC_04: Logout ends the session', async ({ page }) => {
    // Precondition: logged in, on /account
    await loginPage.fillEmail(email);
    await loginPage.fillPassword(password);
    await loginPage.clickLoginButton();
    await expect(page).toHaveURL('/account');

    await accountPage.clickSignOut();

    await expect(page).toHaveURL('/auth/login');
    await expect(loginPage.heading).toBeVisible();
    await expect(loginPage.signInLink).toBeVisible();
    await expect(accountPage.customerNameButton).toBeHidden();

    await accountPage.gotoAccount();
    await expect(page).toHaveURL('/auth/login');
  });

  //refactored to use POM
  test('TC_02: Login with valid credentials after 1 failed attempt', async ({ page, request }) => {
    // New customer for each run, so failed attempts do not count against the shared demo account
    const runId = Date.now();
    const newEmail = `login.${runId}@example.com`;
    // Meets the site's password rules
    const newPassword = `Tq!${runId}`;
    const wrongPassword = `${newPassword}x`;

    await registerCustomer(request, newEmail, newPassword);

    // Precondition: 1 failed login attempt already made
    await createFailedAttempt(request, newEmail, wrongPassword);

    await loginPage.fillEmail(newEmail);
    await loginPage.fillPassword(newPassword);
    await loginPage.clickLoginButton();

    // Being redirected also shows the account is not locked
    await expect(page).toHaveURL('/account');
  });

  //refactored to use POM
  test('TC_03: Login with valid credentials after 2 failed attempts', async ({ page, request }) => {
    // New customer for each run, so failed attempts do not count against the shared demo account
    const runId = Date.now();
    const newEmail = `login.${runId}@example.com`;
    // Meets the site's password rules
    const newPassword = `Tq!${runId}`;
    const wrongPassword = `${newPassword}x`;

    await registerCustomer(request, newEmail, newPassword);

    // Precondition: 2 failed login attempts already made in a row
    for (let attempt = 1; attempt <= 2; attempt++) {
      await createFailedAttempt(request, newEmail, wrongPassword);
    }

    await loginPage.fillEmail(newEmail);
    await loginPage.fillPassword(newPassword);
    await loginPage.clickLoginButton();

    // Being redirected also shows the account is not locked
    await expect(page).toHaveURL('/account');
  });

  //refactored to use POM
  test('TC_08: Login with a registered email and a wrong password', async ({ page, request }) => {
    // New customer for each run, so failed attempts do not count against the shared demo account
    const runId = Date.now();
    const newEmail = `login.${runId}@example.com`;
    // Meets the site's password rules
    const newPassword = `Tq!${runId}`;
    const wrongPassword = `${newPassword}x`;

    await registerCustomer(request, newEmail, newPassword);

    await loginPage.fillEmail(newEmail);
    await loginPage.fillPassword(wrongPassword);
    await loginPage.clickLoginButton();

    await expect(loginPage.invalidLoginError).toBeVisible();
    await expect(page).toHaveURL('/auth/login');
    await expect(loginPage.accountLockedError).not.toBeVisible();
  });

  //refactored to use POM
  test('TC_09: Account locks after 3 consecutive wrong passwords', async ({ page, request }) => {
    // New customer for each run. The lock is permanent, so it is never reused
    const runId = Date.now();
    const newEmail = `login.${runId}@example.com`;
    const newPassword = `Tq!${runId}`;
    const wrongPassword = `${newPassword}x`;

    await registerCustomer(request, newEmail, newPassword);

    for (let attempt = 1; attempt <= 3; attempt++) {
      await createFailedAttempt(request, newEmail, wrongPassword);
    }

    await loginPage.fillEmail(newEmail);
    await loginPage.fillPassword(newPassword);
    await loginPage.clickLoginButton();

    // The lock is checked before the password, so the correct password is refused
    await expect(loginPage.accountLockedError).toContainText('Account locked, too many failed attempts. Please contact the administrator.');
    await expect(page).toHaveURL('/auth/login');
  });
});
