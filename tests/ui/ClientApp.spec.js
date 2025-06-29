import { test } from '@playwright/test'

/**
 * Lecture 15
 * Assignment to get the first product name in
 * https://rahulshettyacademy.com/client/
 */
test('Assignment - Solved 15', async ({ page }) => {
    // username and password
    const useremail = 'anshika@gmail.com'
    const password = 'Iamking@000'

    await page.goto('https://rahulshettyacademy.com/client/')

    // login
    await page.getByPlaceholder('email@example.com').fill(useremail)
    await page.getByPlaceholder('enter your passsword').fill(password)
    await page.getByRole('button', { name: 'Login' }).click()

    await page.waitForLoadState('networkidle')

    /**
     * If 'networkidle' is not workin for you,
     * then,
     * use waitFor() strategy.
     */
    await page.locator('//h5/b').first().waitFor()

    // Get the first product name
    const productName = await page.locator('//h5/b').allTextContents()
    console.log(productName)

    await page.close()
})

// Credentials for Login Practice
const username = 'rahulshettyacademy'
const password = 'learning'

/**
 * Lecture 17
 * Handling static Select dropdown options with Playwright
 */
test('Lecture 17', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')

    await page.getByRole('textbox', { name: 'Username' }).fill(username)
    await page.getByRole('textbox', { name: 'Password' }).fill(password)

    await page.locator('select').selectOption('Consultant')

    await page.getByRole('radio', { name: 'user' }).check()
    await page.getByRole('button', { name: 'Okay' }).click()

    await page.getByRole('checkbox', { name: 'terms' }).check()
    await page.getByRole('button', { name: 'Sign In' }).click()

    await page.pause() // make sure you are running this in "headed" mode and from the terminal. DO NOT RUN FROM VSCODE
})
