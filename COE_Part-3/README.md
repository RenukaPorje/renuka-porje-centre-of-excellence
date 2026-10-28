# COE Part 3: Test Automation with Playwright and TypeScript

Automated tests for [Practice Software Testing (Toolshop)](https://practicesoftwaretesting.com), built up over five days.

## Daily write-ups

| Day | Topic | Write-up |
| --- | --- | --- |
| 1 | TypeScript and Playwright foundations: login suite | [Part-3_Day-1.md](Part-3_Day-1/Part-3_Day-1.md) |
| 2 | API automation: cart API tests and API-based test setup | [Part-3_Day-2.md](Part-3_Day-2/Part-3_Day-2.md) |
| 3 | Structure and stability: page objects, random order, retries and soft assertions | [Part-3_Day-3.md](Part-3_Day-3/Part-3_Day-3.md) |

## What's in this folder

The daily write-ups, with their screenshots and test case files, are in `Part-3_Day-N/` (Day 1 test cases: `Part-3_Day-1/assets/login-test-suite.md`). The code is in `code/`, one complete project per day. Day 1 is in `code/day-1/`, Day 2 is in `code/day-2/` and Day 3 is in `code/day-3/`.

| Path | What it holds |
| --- | --- |
| `code/day-1/tests/ui/` | Browser tests for Toolshop (Day 1: the login suite, 13 cases) |
| `code/day-1/tests/support/` | Setup code shared by the tests (registers a new customer through the UI) |
| `code/day-1/tests/day1-sample-setup-check/` | Day 1 practice tests: Playwright's sample test (runs against playwright.dev), role-based locators and web-first assertions on the Toolshop home page, and a check of how the compiler types Playwright calls (runs on an in-memory page) |
| `code/day-1/day1-setup-check/` | First TypeScript practice files (types, interfaces, modules), used to check the compiler setup |
| `code/day-1/playwright.config.ts` | Playwright settings (browsers, base URL, reporting, one worker) |
| `code/day-1/tsconfig.json` | TypeScript compiler settings |
| `code/day-1/.env.example` | The environment variables the tests need |
| `code/day-2/tests/api/` | Cart API tests with the `request` fixture, rebuilt from a Postman collection (12 tests: 7 positive, 5 negative) |
| `code/day-2/tests/ui/` | The login suite, with test data created through the API (TC_02, TC_03, TC_08, TC_09) |
| `code/day-2/tests/support/` | Setup code: cart helpers and API-based `registerCustomer` and `createFailedAttempt` |
| `code/day-2/postman/` | The Postman collection and environment that the API tests were rebuilt from |
| `code/day-2/playwright.config.ts` | Adds an `api` project (base URL from `API_URL`, JSON Accept header); the browser projects only run `tests/ui` |
| `code/day-3/tests/pages/` | The two page objects: `LoginPage` and `AccountPage` |
| `code/day-3/tests/ui/` | The login suite rewritten with the page objects (`login-refactored.spec.ts`), plus `demo-soft.spec.ts` and `demo-retries.spec.ts` for the soft assertions and retries exercises |
| `code/day-3/tests/support/` | The same API-based `registerCustomer` and `createFailedAttempt` as Day 2 |
| `code/day-3/playwright.config.ts` | The Day 2 settings with `fullyParallel` switched on, so that `--shuffle` can reorder the tests inside one file, and `retries` set to 2 |

Generated folders (`node_modules/`, `playwright-report/`, `test-results/`) and `.env` are not committed.

## How to run

Each day is its own project, so run `npm install` in the day's folder.

Day 1:

```bash
cd code/day-1
npm install
npx playwright install
cp .env.example .env      # then fill in USER_EMAIL, USER_PASSWORD and USER_FULL_NAME
npm test                  # run all tests (login suite + Day 1 practice tests)
npm run test:ui           # run only the login suite in tests/ui
npm run report            # open the last HTML report
npm run typecheck         # check TypeScript without running anything
```

Day 2:

```bash
cd code/day-2
npm install
npx playwright install
cp .env.example .env      # then fill in BASE_URL, API_URL, USER_EMAIL, USER_PASSWORD and USER_FULL_NAME
npm test                  # run everything: the cart API tests and the login suite on chromium, firefox and webkit
npm run test:api          # run only the cart API tests (no browser)
npm run test:ui           # run only the login suite in tests/ui
npm run report            # open the last HTML report
npm run typecheck         # check TypeScript without running anything
```

Day 3:

```bash
cd code/day-3
npm install
npx playwright install
cp .env.example .env      # then fill in BASE_URL, API_URL, USER_EMAIL, USER_PASSWORD and USER_FULL_NAME
npm test                  # run everything: the login suite on chromium, firefox and webkit
npm run test:ui           # run only the tests in tests/ui
npx playwright test tests/ui/login-refactored.spec.ts --shuffle --retries=0 --reporter=list   # random order, the seed is printed in the first line
npm run report            # open the last HTML report
npm run typecheck         # check TypeScript without running anything
```

`API_URL` in the Day 2 and Day 3 `.env` is the Toolshop API address, https://api.practicesoftwaretesting.com.

## Notes on the login tests

- The tests log in with one shared demo customer from the Toolshop docs, set in `.env`. The site locks an account after 3 failed logins and does not unlock it, so if the customer gets locked, switch to another demo customer in `.env`.
- Tests run on one worker, because failed logins from two browsers at the same time would add up on the shared account.
- TC_08 and TC_09 register a new customer for each run, so their failed logins never touch the shared account.
- The tests run on Chromium, Firefox and WebKit. Firefox first failed to launch on macOS because the system blocked it from its data folder ([Playwright issue](https://github.com/microsoft/playwright/issues/42768)). Adding VS Code to Full Disk Access in System Settings, under Privacy & Security, fixed it.

## Notes on Day 2

- The `api` project runs without a browser, so `npm run test:api` needs no browser install. The chromium, firefox and webkit projects only pick up `tests/ui`.
- The cart tests create a cart for each test and do not delete it.
- TC_02, TC_03, TC_08 and TC_09 now register their own customer through the API, and TC_02, TC_03 and TC_09 make their failed attempts through it too, so only TC_01 and TC_04 use the shared demo customer.

## Notes on Day 3

- `LoginPage` and `AccountPage` hold the locators and the actions. The assertions stay in the tests.
- `fullyParallel` is on in this config so that `--shuffle` can reorder the tests inside the file. `workers: 1` is unchanged, so the tests still run one at a time unless `--workers` is passed.
- Day 3 has no API tests. The `api` project in the config is left over from Day 2.
- `demo-soft.spec.ts` and `demo-retries.spec.ts` are demos for the soft assertions and retries exercises. The tests that fail on purpose are commented out, and each file explains how to run them again. The config sets `retries: 2`, and the retries exercise also passes `--retries=2` on the command line.
