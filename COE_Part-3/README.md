# COE Part 3: Test Automation with Playwright and TypeScript

Automated tests for [Practice Software Testing (Toolshop)](https://practicesoftwaretesting.com), built up over five days.

## Daily write-ups

| Day | Topic | Write-up |
| --- | --- | --- |
| 1 | TypeScript and Playwright foundations: login suite | [Part-3_Day-1.md](Part-3_Day-1/Part-3_Day-1.md) |

## What's in this folder

| Path | What it holds |
| --- | --- |
| `tests/ui/` | Browser tests for Toolshop (Day 1: login) |
| `tests/day1-sample-setup-check/` | Playwright's sample test, kept as proof the setup ran (tests playwright.dev, not Toolshop) |
| `day1-setup-check/` | First TypeScript files, used to check the compiler setup |
| `Part-3_Day-N/` | Daily write-up and its screenshots (`assets/`) |
| `playwright.config.ts` | Playwright settings (browsers, base URL, reporting) |
| `tsconfig.json` | TypeScript compiler settings |
| `.env.example` | The environment variables the tests need |

Generated folders (`node_modules/`, `playwright-report/`, `test-results/`) and `.env` are not committed.

## How to run

Requires Node.js 24 LTS.

```bash
cd COE_Part-3
npm install
npx playwright install
cp .env.example .env      # then fill in USER_EMAIL and USER_PASSWORD
npm test                  # run all tests (Toolshop tests + setup check)
npm run test:ui           # run only the Toolshop browser tests in tests/ui
npm run report            # open the last HTML report
npm run typecheck         # check TypeScript without running anything
```
