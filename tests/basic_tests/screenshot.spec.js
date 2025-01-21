import { test } from '@playwright/test';

/**
 * Page Screenshot
 */
test('Page Screenshot', async ({ page }) => {
    await page.goto('https://playwright.dev');
    await page.screenshot({ path: 'screenshots/screenshot.png' });
});

/**
 * Element Screenshot
 */
test('Element Screenshot', async ({ page }) => {
    await page.goto('https://playwright.dev');
    await page.locator('h1').screenshot({ path: 'screenshots/element-screenshot.png' });
});
