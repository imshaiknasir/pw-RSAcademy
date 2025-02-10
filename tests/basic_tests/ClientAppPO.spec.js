import { expect, test } from '@playwright/test'
import PageObjManager from '../../pages/pageObj_manager'

/**
 * Lecture 73-75: Page Object Model
 */

test('Client App login with Page Object', { tag: ['@pageObjTest_login'] }, async ({ page }) => {
    const pageObjManager = new PageObjManager(page)
    const loginPage = await pageObjManager.getloginPage()
    const dashboardPage = await pageObjManager.getDashboardPage()
    const cartPage = await pageObjManager.getCartPage()
    const checkoutPage = await pageObjManager.getCheckoutPage()

    // Test data
    const email = 'anshika@gmail.com'
    const password = 'Iamking@000'
    const productName = 'IPHONE'

    await loginPage.goto()
    await loginPage.login(email, password)

    await dashboardPage.waitForFirstProduct()
    await dashboardPage.addProductToCart(productName)
    await dashboardPage.goToCart()

    await cartPage.assertCartHasItems()
    await cartPage.goForCheckout()

    await checkoutPage.enterCountryAndSelect('Ind')
    await checkoutPage.selectCountry('India')
    await checkoutPage.placeOrder()

    expect(await checkoutPage.assertOrderSuccess()).toBeTruthy()
})
