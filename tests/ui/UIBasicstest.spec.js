// @ts-check
import { test, expect, chromium } from '@playwright/test'

/**
 * This covers upto Lecture 14
 */

test('Browser Context Playwright Test', { tag: '@smoke' }, async ({ browser }) => {
    const browserContext = await browser.newContext()
    const page = await browserContext.newPage()
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    console.log(await page.title())
})

test('Page Context Playwright Test', { tag: '@smoke' }, async ({ page }) => {
    await page.goto('https://google.com')
    console.log(await page.title())
    await expect(page).toHaveTitle('Google')
})

test('Fill Login Form with incorrect credentials', async () => {
    const browser = await chromium.launch()
    const browserContext = await browser.newContext()
    const page = await browserContext.newPage()
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    await page.getByRole('textbox', { name: 'Username' }).fill('rahulshetty')
    await page.getByRole('textbox', { name: 'Password' }).fill('learning')
    await page.getByRole('button', { name: 'Sign In' }).click()

    await expect(page.getByRole('strong')).toContainText('Incorrect')
})

test('Fill Login Form with correct credentials', async () => {
    const browser = await chromium.launch()
    const browserContext = await browser.newContext()
    const page = await browserContext.newPage()

    /**
     * Reusable code
     */
    const Username = 'rahulshettyacademy'
    const Password = 'learning'
    const usernameElement = page.getByRole('textbox', { name: 'Username' })
    const passwordElement = page.getByRole('textbox', { name: 'Password' })
    const signInButton = page.getByRole('button', { name: 'Sign In' })

    /**
     * Login with incorrect credentials
     */
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    await usernameElement.fill('rahulshetty')
    await passwordElement.fill(Password)
    await signInButton.click()
    // Check if the error message is displayed
    await expect(page.getByRole('strong')).toContainText('Incorrect')

    /**
     * Login with correct credentials
     */
    await usernameElement.fill(Username)
    await passwordElement.fill(Password)
    await signInButton.click()
    // Check if the first product is displayed
    await expect(page.locator("//h4[@class='card-title']").first()).toContainText('iphone X')
})

test('Accessing the Dashboard', async ({ page }) => {
    // Reusable code
    const Username = 'rahulshettyacademy'
    const Password = 'learning'
    const usernameElement = page.getByRole('textbox', { name: 'Username' })
    const passwordElement = page.getByRole('textbox', { name: 'Password' })
    const signInButton = page.getByRole('button', { name: 'Sign In' })
    const productsLocator = page.locator("//h4[@class='card-title']/a")

    // Login with correct credentials
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    await usernameElement.fill(Username)
    await passwordElement.fill(Password)
    await signInButton.click()

    await productsLocator.first().waitFor()

    // Print the first 2 item names
    console.log(await productsLocator.first().innerText())
    console.log(await productsLocator.nth(1).innerText())
})

/**
 * Lecture 14
 * Understanding how wait mechanism works if list of elements are returned
 */
test('Lecture 14', async ({ page }) => {
    // Reusable code
    const Username = 'rahulshettyacademy'
    const Password = 'learning'
    const usernameElement = page.getByRole('textbox', { name: 'Username' })
    const passwordElement = page.getByRole('textbox', { name: 'Password' })
    const signInButton = page.getByRole('button', { name: 'Sign In' })
    const productsLocator = page.locator("//h4[@class='card-title']/a")

    // Login with correct credentials
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    await usernameElement.fill(Username)
    await passwordElement.fill(Password)
    await signInButton.click()

    await productsLocator.first().waitFor()

    // Lets List all the products using for each loop
    const products = await productsLocator.allTextContents()
    for (const product of products) {
        console.log(product)
    }
})

/**
 * Lecture 14
 * Assignment to get the first product name in
 * https://rahulshettyacademy.com/client/
 */
test('Assignment 14', async ({ page }) => {
    // username and password
    const useremail = 'chabeli@chrfeeul.com'
    const password = 'Proton@12'

    await page.goto('https://rahulshettyacademy.com/client/')

    // login
    await page.getByPlaceholder('email@example.com').fill(useremail)
    await page.getByPlaceholder('enter your passsword').fill(password)
    await page.getByRole('button', { name: 'Login' }).click()

    // Get the first product name
    const productName = await page.locator('//h5/b').first().innerText()
    console.log(productName)
})

// Lecture 17, 18, 19
test('Selecting radio buttons, Checkboxes and implement expect assertions', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    const dropdown = page.locator('select.form-control')
    await dropdown.selectOption('consult')
    await page.locator('.radiotextsty').last().click()
    await page.locator('#okayBtn').click()
    console.log(await page.locator('.radiotextsty').last().isChecked())
    expect(page.locator('.radiotextsty').last()).toBeChecked()
    await page.locator('#terms').click()
    await expect(page.locator('#terms')).toBeChecked()
    await page.locator('#terms').uncheck()
    // expect(await page.locator("#terms").isChecked()).toBeFalsy();
    // or
    await expect(page.locator('#terms')).not.toBeChecked()

    const documentLink = page.locator("[href*='documents-request']")
    await expect(documentLink).toHaveAttribute('class', 'blinkingText')
})

// Lecture 20
test('Lecture 20', async ({ browser }) => {
    const browserContext = await browser.newContext()
    const page = await browserContext.newPage()

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    const documentLink = page.locator("[href*='documents-request']")

    const newPagePromise = browserContext.waitForEvent('page')
    await documentLink.click()
    const newPage = await newPagePromise

    const arrayText = await newPage.locator('.red').textContent()
    const text = arrayText?.split('@')
    const email = text?.[1]?.split(' ')[0]
    console.log({ email })

    await page.locator('#username').fill(email ?? '')
    console.log(`Text in username field: ${await page.locator('#username').inputValue()}`)
    await page.locator('#username').screenshot({ path: 'username.png' })
})

/**
 * Playwright Debug feature:
 * "npx playwright tests/your.spec.js --debug runs Playwright tests in debug mode,
 * allowing step-by-step execution, interactive debugging, and a visible browser GUI.
 *
 *
 * Instead of "Explore" in Playwright, we now have "Pick Locator" button in the top right corner
 *
 *
 * Record Playback feature: "npx playwright codegen demo.playwright.dev/todomvc"
 * More details: https://playwright.dev/docs/codegen-intro#running-codegen
 */
