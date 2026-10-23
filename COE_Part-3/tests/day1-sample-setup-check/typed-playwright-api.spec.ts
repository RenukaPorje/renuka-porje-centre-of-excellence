import { test, expect } from '@playwright/test';

// Day 1: shows what the TypeScript compiler checks in Playwright calls.
// The test runs against an in-memory page, so it needs no network or .env values.

test('typed Playwright calls compile and pass', async ({ page }) => {
    await page.setContent('<title>Demo</title><button>Go</button>');

    await page.getByRole('button', { name: 'Go' }).click();
    await expect(page).toHaveTitle('Demo');
    
   // await page.getByRole('buton', { name: 'Go' }).click();   //Argument of type '"buton"' is not assignable to parameter of type '"alert" | "alertdialog" | "application" | "article" | "banner" | "blockquote" | "button" | "caption" | "cell" | "checkbox" | "code" | "columnheader" | "combobox" | "complementary" | ... 67 more ... | "treeitem"'.
    // 'buton' is not a valid role
   // await expect(page).toHaveTitle(123);                //Error: Argument of type 'number' is not assignable to parameter of type 'string | RegExp'.     
    // toHaveTitle takes a string or RegExp

});
