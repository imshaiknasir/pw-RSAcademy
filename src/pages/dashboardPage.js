/** @typedef {import('@playwright/test').Page} Page */

class DashboardPage {
    /**
     * @param {Page} page
     */
    constructor(page) {
        this.page = page
        this.products = this.page.locator('.card-body')
        this.cart = this.page.locator('//button[@routerlink="/dashboard/cart"]')
        this.checkout = this.page.locator('.btn-primary')
    }

    async waitForFirstProduct() {
        console.log('⌛ Waiting for products to load')
        await this.products.first().waitFor()
    }

    async addProductToCart(productName) {
        console.log('🛍️ Adding product to cart:', productName)
        await this.products.filter({ hasText: productName }).getByRole('button', { name: 'Add to Cart' }).click()
    }

    async goToCart() {
        console.log('🛒 Navigating to cart')
        await this.cart.click()
    }
}

export default DashboardPage
