import { test, expect } from '@playwright/test';

// Practice: locate elements by role and use web-first assertions on the Toolshop home page.

test('home page: heading, search box and Contact link', async ({ page }) => {
    // Open the home page.
    await page.goto('/');

    // Locate the main heading by its role and name, then check it is visible.
    const heading = page.getByRole('heading', { name: 'Practice Software Testing - Toolshop' });
    await expect(heading).toBeVisible();

    // Locate the search box by its role and name, type into it, then check what it holds.
    const searchBox = page.getByRole('textbox', { name: 'Search' });
    await searchBox.fill('Hammer');
    await expect(searchBox).toHaveValue('Hammer');

    // Click the Contact link in the navigation, then check the browser moved to /contact.
    await page.getByRole('link', { name: 'Contact' }).click();
    await expect(page).toHaveURL(/contact/);
});
