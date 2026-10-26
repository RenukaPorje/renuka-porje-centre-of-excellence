# COE Part 3: Test Automation with Playwright and TypeScript

Automated tests for [Practice Software Testing (Toolshop)](https://practicesoftwaretesting.com), built up over five days.

## Daily write-ups

| Day | Topic | Write-up |
| --- | --- | --- |
| 1 | TypeScript and Playwright foundations: login suite | [Part-3_Day-1.md](Part-3_Day-1/Part-3_Day-1.md) |

## What's in this folder

The daily write-ups, with their screenshots and test case files, are in `Part-3_Day-N/` (Day 1 test cases: `Part-3_Day-1/assets/login-test-suite.md`). The code is in `code/`, one complete project per day. Day 1 is in `code/day-1/`.

| Path | What it holds |
| --- | --- |
| `code/day-1/tests/ui/` | Browser tests for Toolshop (Day 1: the login suite, 13 cases) |
| `code/day-1/tests/support/` | Setup code shared by the tests (registers a new customer through the UI) |
| `code/day-1/tests/day1-sample-setup-check/` | Day 1 practice tests: Playwright's sample test (runs against playwright.dev), role-based locators and web-first assertions on the Toolshop home page, and a check of how the compiler types Playwright calls (runs on an in-memory page) |
| `code/day-1/day1-setup-check/` | First TypeScript practice files (types, interfaces, modules), used to check the compiler setup |
| `code/day-1/playwright.config.ts` | Playwright settings (browsers, base URL, reporting, one worker) |
| `code/day-1/tsconfig.json` | TypeScript compiler settings |
| `code/day-1/.env.example` | The environment variables the tests need |

Generated folders (`node_modules/`, `playwright-report/`, `test-results/`) and `.env` are not committed.

## How to run

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

## Notes on the login tests

- The tests log in with one shared demo customer from the Toolshop docs, set in `.env`. The site locks an account after 3 failed logins and does not unlock it, so if the customer gets locked, switch to another demo customer in `.env`.
- Tests run on one worker, because failed logins from two browsers at the same time would add up on the shared account.
- TC_08 and TC_09 register a new customer for each run, so their failed logins never touch the shared account.
- The tests run on Chromium and WebKit. Firefox is disabled in `playwright.config.ts` because it does not launch locally on macOS due to an unresolved issue, and is to be re-enabled before Day 5.
