import { expect, request, test } from '@playwright/test'
import { API_Utils } from '../utils/API_Utils'

let token = ''
const apiContext = await request.newContext()
const apiUtils = new API_Utils(apiContext)

test.beforeAll(async () => {
    console.log('>>> Start of Before all <<<')
    token = await apiUtils.getToken()
    console.log('>>> End of Before all <<<')
})

test('Get all products and place order for the first product', async ({ page }) => {
    await page.addInitScript(injectToken => {
        window.localStorage.setItem('token', injectToken)
    }, token)

    const requestPromise = page.waitForRequest(request => request.url().includes("/api/ecom/product/get-all-products") && request.method() === "POST")
    await page.goto('https://rahulshettyacademy.com/client');
    const requestResolved = await requestPromise

    // Get the response and parse its JSON
    const response = await requestResolved.response()
    const responseBody = await response.json()
    const products = responseBody.data

    // Print all the product names and ids
    for (let product of products) {
        console.log(`> Product name is ${product.productName} and id is ${product._id}`)
    }

    // Get the first product
    let firstProduct = products[0]
    console.log(`>> First product name is ${firstProduct.productName} and id is ${firstProduct._id}`)

    // Place order for the first product
    const placeOrderResponse = await apiUtils.placeOrder(token, firstProduct._id)
    expect(placeOrderResponse.status()).toBe(201)

    // Get the order id from the response
    const placeOrderResponseBody = await placeOrderResponse.json()
    const orderId = placeOrderResponseBody.orders[0]
    console.log(`>> Order id is ${orderId}`)

    // Navigate to the order history page
    await page.locator("//button[@routerlink='/dashboard/myorders']").click();

    // Find the order with the order id
    const allOrderRows = page.locator("//tr");
    await allOrderRows.first().waitFor({ state: "visible" }); // lets wait for the first order row to be visible

    for (let i = 0; i < (await allOrderRows.count()); i++) {
        const orderRow = allOrderRows.nth(i); // this will get the order row
        const orderIdFromOrderHistory = await orderRow.locator("//th[1]").textContent(); // this will get the order id from the order history

        if (orderIdFromOrderHistory === orderId) { // this will check if the order id from the order history matches with the extracted order id
            console.log(`>> Order id ${orderId} found in the order history`)
            await orderRow.getByRole("button", { name: "View", exact: true }).click(); // this will click on the "view" button
            break;
        }
    }

    // Assert the order id in the Order Details Page
    const orderIdInOrderDetailsPage = page.locator("//small/following-sibling::div");
    await orderIdInOrderDetailsPage.waitFor({ state: "visible" });
    expect((await orderIdInOrderDetailsPage.textContent()).trim()).toContain(orderId);
})