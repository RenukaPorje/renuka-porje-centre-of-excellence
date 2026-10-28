import {type Locator, type Page } from '@playwright/test';

export class AccountPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly customerNameButton: Locator;
  readonly accountMenu: Locator;
  readonly signOutLink: Locator;

  constructor(page: Page, fullName: string) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'My account', exact: true });
    this.customerNameButton = page.getByRole('button', { name: fullName, exact: true });
    this.accountMenu = page.getByRole('list', { name: fullName });
    // Sign out is an <a> without an href, so it has no link role; found by its text inside the menu
    this.signOutLink = this.accountMenu.getByText('Sign out', { exact: true });

  }

  async gotoAccount() {
    await this.page.goto('/account');
  }

  async clickSignOut() {
    await this.customerNameButton.click();
    await this.signOutLink.click();
  }

}
