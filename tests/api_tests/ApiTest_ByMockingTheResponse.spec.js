import { expect, request, test } from '@playwright/test'

let token = ''

test.beforeAll(async () => {
    console.log('>>> Start of Before all <<<')
    const apiContext = await request.newContext()
    const response = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
        data: {
            userEmail: "anshika@gmail.com",
            userPassword: "Iamking@000"
        }
    })
    expect(response.status()).toBe(200)
    const responseBody = await response.json()
    console.log({ responseBody })
    token = responseBody.token
    console.log('>>> End of Before all <<<')
})

test('Mocking the response for the orders page', async ({ page }) => {
    // First we need to inject the token into the page
    await page.addInitScript(injectToken => {
        window.localStorage.setItem('token', injectToken)
    }, token)

    // Before we navigate to the page, we need to wait for a request to be made
    const getRequestPromise = page.waitForRequest(request => request.url().includes('https://rahulshettyacademy.com/api/ecom/user/get-cart-count/') && request.method() === 'GET')
    // Then we need to navigate to the page
    await page.goto('https://rahulshettyacademy.com/client')
    // Wait for the request to be made
    const getRequest = await getRequestPromise

    // From the getRequest, we can get the complete URL/
    // like "https://rahulshettyacademy.com/api/ecom/user/get-cart-count/620c7bf148767f1f1215d2ca"
    // and we need to extract the userId from the URL, i.e 620c7bf148767f1f1215d2ca
    const userId = getRequest.url().split('/')[7]
    console.log({ userId })

    // Assert that we land on the products page
    const productsLocator = page.locator('//h5/b')
    await productsLocator.first().waitFor({ state: 'visible' })

    // Mock the response for the orders page, before we go to the orders page
    await page.route(`https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/${userId}`, async route => {
        await route.fulfill({
            body: JSON.stringify({ "data": [], "message": "No Orders" })
        })
    })

    // Lets goto Orders page
    await page.locator("//button[@routerlink='/dashboard/myorders']").click()

    // Assert that there are no orders on the orders page
    const noOrdersLocator = page.locator("//div[contains(text(),'You have No Orders')]")
    await expect(noOrdersLocator).toBeVisible()
})