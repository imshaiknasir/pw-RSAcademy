import { expect, request, test } from '@playwright/test'

let token = ''

test.beforeAll(async () => {
    console.log('>>> Start of Before all <<<')
    const apiContext = await request.newContext()
    const response = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
        data: {
            userEmail: 'anshika@gmail.com',
            userPassword: 'Iamking@000',
        },
    })
    expect(response.status()).toBe(200)
    const responseBody = await response.json()
    console.log({ responseBody })
    token = responseBody.token
    console.log('>>> End of Before all <<<')
})

test('Mocking the Request for the orders view page', async ({ page }) => {
    // First we need to inject the token into the page
    await page.addInitScript((injectToken) => {
        window.localStorage.setItem('token', injectToken)
    }, token)

    // Then we need to navigate to the page
    await page.goto('https://rahulshettyacademy.com/client')

    // Assert that we land on the products page
    const productsLocator = page.locator('//h5/b')
    await productsLocator.first().waitFor({ state: 'visible' })

    // Lets goto Orders page
    await page.locator("//button[@routerlink='/dashboard/myorders']").click()

    // Before we view the order, we need to modify the request
    await page.route(`https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*`, async (route) => {
        await route.continue({
            url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=678a69d1e2b5443b1f281570',
        })
    })

    // Now lets view the order
    await page.getByRole('button', { name: 'View', exact: true }).first().click()

    // Assert the error message
    const errorMessageLocator = page.locator("//p[contains(text(),'You are not authorize to view this order')]")
    await expect(errorMessageLocator).toBeVisible()
})
