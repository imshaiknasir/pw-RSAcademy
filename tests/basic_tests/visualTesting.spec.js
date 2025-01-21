import { expect, test } from '@playwright/test';

test('Page Screenshot comparison', { tag: ['@visualTesting'] }, async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });

    await page.goto('https://www.flightaware.com/', { waitUntil: 'networkidle' });
    await expect(page).toHaveScreenshot('screenshots/flight-booking_page.png', { maxDiffPixels: 86 });
});

test('Element Screenshot comparison', { tag: ['@visualTesting'] }, async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });

    await page.goto('https://www.flightaware.com/', { waitUntil: 'networkidle' });
    const header = page.locator("#topWrapper");
    await header.screenshot({ path: 'screenshots/flight-booking_header.png' });
    await expect(header).toHaveScreenshot('screenshots/flight-booking_header.png', { maxDiffPixels: 86 });
});
