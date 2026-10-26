import { test, expect } from '@playwright/test';
import { registerCustomer } from '../support/register-customer';

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

  //Verify that the "Register your account" link opens the registration page and all required fields are visible
  test('TC_12: Register link opens the registration page', async ({ page }) => {
    const registerLink = page.getByRole('link', { name : 'Register your account'});
    await expect(registerLink).toBeVisible();
    await registerLink.click();

    await expect(page).toHaveURL('/auth/register');
    await expect(page.getByRole('heading' , { name : 'Customer registration'})).toBeVisible();

    // Verify that all the required fields are visible
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

  //Verify that the "Forgot your Password?" link opens the forgot password page and all required fields are visible
  test('TC_13: Forgot password link opens the forgot password page', async ({ page }) => {
    const forgotPassword = page.getByRole('link', { name : 'Forgot your Password?'});
    await expect(forgotPassword).toBeVisible();
    await forgotPassword.click();

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
  test('TC_10: Login with the password left empty', async ({ page }) => {
    const loginHeading = page.getByRole('heading', { name : 'Login'});
    await expect(loginHeading).toBeVisible();

    await page.getByLabel('Email address').fill(email);
    await page.getByRole('button', { name : 'Login'}).click();

    // The message must be attached to the Password field, so check it on the field itself.
    // Positive check first: it waits for validation to run before the "not shown" check below.
    await expect(page.getByLabel('Password *', { exact: true })).toHaveAccessibleDescription('Password is required');

    const emailError = page.getByText('Email is required');
    await expect(emailError).not.toBeVisible();

    await expect(page).toHaveURL('/auth/login');
  });

  test('TC_11: Login with the email left empty', async ({ page }) => {
    const loginHeading = page.getByRole('heading', { name : 'Login'});
    await expect(loginHeading).toBeVisible();

    await page.getByLabel('Password *', { exact: true }).fill(password);
    await page.getByRole('button', { name : 'Login'}).click();

    await expect(page.getByLabel('Email address')).toHaveAccessibleDescription('Email is required');

    const passwordError = page.getByText('Password is required');
    await expect(passwordError).not.toBeVisible();

    await expect(page).toHaveURL('/auth/login');
  });

  test('TC_05: Login with the email and password left empty', async ({ page }) => {
    const loginHeading = page.getByRole('heading', { name : 'Login'});
    await expect(loginHeading).toBeVisible();

    await page.getByRole('button', { name : 'Login'}).click();

    await expect(page.getByLabel('Email address')).toHaveAccessibleDescription('Email is required');
    await expect(page.getByLabel('Password *', { exact: true })).toHaveAccessibleDescription('Password is required');

    await expect(page).toHaveURL('/auth/login');
  });

  test('TC_06: Login with the email in the wrong format', async ({ page }) => {
    // Invalid partition: an email with no @ sign. The login form's validator rejects it.
    const emailWithoutAt = 'abc';

    const loginHeading = page.getByRole('heading', { name : 'Login'});
    await expect(loginHeading).toBeVisible();

    await page.getByLabel('Email address').fill(emailWithoutAt);
    await page.getByLabel('Password *', { exact: true }).fill(password);
    await page.getByRole('button', { name : 'Login'}).click();

    await expect(page.getByLabel('Email address')).toHaveAccessibleDescription('Email format is invalid');

    const passwordError = page.getByText('Password is required');
    await expect(passwordError).not.toBeVisible();

    await expect(page).toHaveURL('/auth/login');
  });

  test('TC_07: Login with an unregistered email', async ({ page }) => {
    // Unique for each run, on example.com (reserved), so no customer can have registered it
    const unregisteredEmail = `no.such.user.${Date.now()}@example.com`;

    const loginHeading = page.getByRole('heading', { name : 'Login'});
    await expect(loginHeading).toBeVisible();

    await page.getByLabel('Email address').fill(unregisteredEmail);
    await page.getByLabel('Password *', { exact: true }).fill(password);
    await page.getByRole('button', { name : 'Login'}).click();

    // Positive check first, so it waits for the server's response
    await expect(page.getByText('Invalid email or password')).toBeVisible();

    await expect(page).toHaveURL('/auth/login');
  });

  test('TC_04: Logout ends the session', async ({ page }) => {
    // Precondition: logged in, on /account
    await page.getByLabel('Email address').fill(email);
    await page.getByLabel('Password *', { exact: true }).fill(password);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL('/account');

    await page.getByRole('button', { name: fullName, exact: true }).click();

    // Sign out is an <a> without an href, so it has no link role. Find it by text inside the dropdown.
    const accountMenu = page.getByRole('list', { name: fullName });
    await accountMenu.getByText('Sign out', { exact: true }).click();

    await expect(page).toHaveURL('/auth/login');
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Sign in', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: fullName, exact: true })).toBeHidden();

    await page.goto('/account');
    await expect(page).toHaveURL('/auth/login');
  });

  test('TC_02: Login with valid credentials after 1 failed attempt', async ({ page }) => {
    // Derived from the real password: always wrong, and long enough to pass the form's length check
    const wrongPassword = `${password}x`;

    // Precondition: 1 failed login attempt already made
    await page.getByLabel('Email address').fill(email);
    await page.getByLabel('Password *', { exact: true }).fill(wrongPassword);
    await page.getByRole('button', { name: 'Login' }).click();
    // The message shows the server has answered, so the attempt is counted
    await expect(page.getByText('Invalid email or password')).toBeVisible();

    await page.getByLabel('Email address').fill(email);
    await page.getByLabel('Password *', { exact: true }).fill(password);
    await page.getByRole('button', { name: 'Login' }).click();

    // Being redirected also shows the account is not locked
    await expect(page).toHaveURL('/account');
  });

  test('TC_03: Login with valid credentials after 2 failed attempts', async ({ page }) => {
    // Derived from the real password: always wrong, and long enough to pass the form's length check
    const wrongPassword = `${password}x`;

    // Precondition: 2 failed login attempts already made in a row
    for (let attempt = 1; attempt <= 2; attempt++) {
      await page.getByLabel('Email address').fill(email);
      await page.getByLabel('Password *', { exact: true }).fill(wrongPassword);
      // The message from the first attempt is still on screen, so it cannot show the second was counted.
      // Wait for the login response instead.
      const loginResponse = page.waitForResponse((response) => response.url().includes('/users/login'));
      await page.getByRole('button', { name: 'Login' }).click();
      await loginResponse;
    }

    await page.getByLabel('Email address').fill(email);
    await page.getByLabel('Password *', { exact: true }).fill(password);
    await page.getByRole('button', { name: 'Login' }).click();

    // Being redirected also shows the account is not locked
    await expect(page).toHaveURL('/account');
  });

  test('TC_08: Login with a registered email and a wrong password', async ({ page }) => {
    // New customer for each run, so failed attempts do not count against the shared demo account
    const runId = Date.now();
    const newEmail = `login.${runId}@example.com`;
    // Meets the site's password rules
    const newPassword = `Tq!${runId}`;
    const wrongPassword = `${newPassword}x`;

    await registerCustomer(page, newEmail, newPassword);

    await page.getByLabel('Email address').fill(newEmail);
    await page.getByLabel('Password *', { exact: true }).fill(wrongPassword);
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('Invalid email or password')).toBeVisible();
    await expect(page).toHaveURL('/auth/login');
    await expect(page.getByText('Account locked')).not.toBeVisible();
  });

  test('TC_09: Account locks after 3 consecutive wrong passwords', async ({ page }) => {
    // New customer for each run. The lock is permanent, so it is never reused
    const runId = Date.now();
    const newEmail = `login.${runId}@example.com`;
    const newPassword = `Tq!${runId}`;
    const wrongPassword = `${newPassword}x`;

    await registerCustomer(page, newEmail, newPassword);

    for (let attempt = 1; attempt <= 3; attempt++) {
      await page.getByLabel('Email address').fill(newEmail);
      await page.getByLabel('Password *', { exact: true }).fill(wrongPassword);
      // The previous message is still on screen, so wait for this attempt's response
      const loginResponse = page.waitForResponse((response) => response.url().includes('/users/login'));
      await page.getByRole('button', { name: 'Login' }).click();
      await loginResponse;
      await expect(page.getByText('Invalid email or password')).toBeVisible();
    }

    await page.getByLabel('Password *', { exact: true }).fill(newPassword);
    await page.getByRole('button', { name: 'Login' }).click();

    // The lock is checked before the password, so the correct password is refused
    await expect(page.getByText('Account locked, too many failed attempts. Please contact the administrator.')).toBeVisible();
    await expect(page).toHaveURL('/auth/login');
  });
});
