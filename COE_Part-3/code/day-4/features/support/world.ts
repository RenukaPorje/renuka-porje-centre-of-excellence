import {
  After,
  AfterAll,
  Before,
  BeforeAll,
  IWorldOptions,
  setDefaultTimeout,
  setWorldConstructor,
  Status,
  World,
} from '@cucumber/cucumber';
import { Browser, BrowserContext, chromium, Page } from '@playwright/test';
import { CartPage } from '../pages/cart-page';

const BASE_URL = process.env.BASE_URL ?? 'https://practicesoftwaretesting.com';

setDefaultTimeout(30_000);

// One browser is started for the whole run, and every scenario gets its own fresh context and page so the scenarios stay independent.
let browser: Browser;

export class CustomWorld extends World {
  context!: BrowserContext;
  page!: Page;
  cartPage!: CartPage;
  readonly baseURL = BASE_URL;
  productName = '';
  quantity = 0;
  unitPrice = 0;

  constructor(options: IWorldOptions) {
    super(options);
  }

  // The app looks for the cart id in the session storage, so this gives the browser the cart that was created through the API.
  async giveBrowserTheCart(cartId: string) {
    await this.page.goto('/');
    await this.page.evaluate((id) => sessionStorage.setItem('cart_id', id), cartId);
  }
}

setWorldConstructor(CustomWorld);

BeforeAll(async function () {
  browser = await chromium.launch({ headless: process.env.HEADLESS !== 'false' });
});

Before(async function (this: CustomWorld) {
  this.context = await browser.newContext({ baseURL: this.baseURL });
  this.page = await this.context.newPage();
  this.cartPage = new CartPage(this.page);
});

After(async function (this: CustomWorld, { result }) {
  if (result?.status === Status.FAILED) {
    const screenshot = await this.page.screenshot({ fullPage: true });
    this.attach(screenshot, 'image/png');
  }
  await this.context?.close();
});

AfterAll(async function () {
  await browser?.close();
});
