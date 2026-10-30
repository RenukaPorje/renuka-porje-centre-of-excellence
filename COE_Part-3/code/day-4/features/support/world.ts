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

const BASE_URL = process.env.BASE_URL ?? 'https://practicesoftwaretesting.com';

setDefaultTimeout(30_000);

// One browser for the whole run; each scenario gets a fresh context and page.
let browser: Browser;

export class CustomWorld extends World {
  context!: BrowserContext;
  page!: Page;
  readonly baseURL = BASE_URL;
  productName = '';
  quantity = 0;
  unitPrice = 0;

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);

BeforeAll(async function () {
  browser = await chromium.launch({ headless: process.env.HEADLESS !== 'false' });
});

Before(async function (this: CustomWorld) {
  this.context = await browser.newContext({ baseURL: this.baseURL });
  this.page = await this.context.newPage();
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
