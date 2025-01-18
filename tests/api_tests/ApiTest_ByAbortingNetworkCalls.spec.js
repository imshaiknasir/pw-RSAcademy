import { expect, test } from '@playwright/test'

test('Aborting the Request', async ({ page }) => {
    // Navigate to the page
    await page.goto('https://rahulshettyacademy.com/')

    const registerButtonLocator = page.locator("//a[text()='Register']")
    await expect(registerButtonLocator).toHaveCSS('background-color', 'rgb(236, 82, 82)') // it should have red background color

    // Next, we will do the same check with aborting the request for the css files
    await page.route('**/*.css', async route => {
        await route.abort()
    })
    await page.reload()

    await expect(registerButtonLocator).not.toHaveCSS('background-color', 'rgb(236, 82, 82)') // it should not have red background color
})
