import { type Page, type Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly emailField: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;
  readonly emailError: Locator;
  readonly passwordError: Locator;
  readonly invalidLoginError: Locator;
  readonly signInLink: Locator;
  readonly forgotPasswordLink: Locator;
  readonly registerLink: Locator;
  readonly accountLockedError: Locator;


  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Login' });
    this.emailField = page.getByLabel('Email address');
    this.passwordField = page.getByLabel('Password *', { exact: true });
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.emailError = page.getByText('Email is required');
    this.passwordError = page.getByText('Password is required');
    this.invalidLoginError = page.getByText('Invalid email or password');
    this.signInLink = page.getByRole('link', { name: 'Sign in', exact: true });
    this.forgotPasswordLink = page.getByRole('link', { name: 'Forgot your Password?', exact: true });
    this.registerLink = page.getByRole('link', { name : 'Register your account', exact: true });
    this.accountLockedError = page.getByText('Account locked');
  }

  // Navigate to the login page (replacing the goto in beforeEach in tests)
  async gotoLogin() {
    await this.page.goto('/auth/login');
  }

  //Click the login button (replacing the click in tests)
  async clickLoginButton() {
    await this.loginButton.click();
  }

  async fillEmail(email: string) {
    await this.emailField.fill(email);
  }
  
  async fillPassword(password: string) {
    await this.passwordField.fill(password);
  }

  async clickForgotPassword() {
    await this.forgotPasswordLink.click();
  }

  async clickRegisterLink() {
    await this.registerLink.click();
  }
}
