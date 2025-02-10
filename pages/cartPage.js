/** @typedef {import('@playwright/test').Page} Page */

class CartPage {
    /**
     * @param {Page} page
     */
    constructor(page) {
        this.page = page
        this.cartItems = this.page.locator('div.cart li')
        this.checkoutButton = this.page.getByRole('button', { name: 'Checkout' })
    }

    async assertCartHasItems() {
        console.log('✅ Verifying cart has items')
        await this.cartItems.first().waitFor({ state: 'visible' })
    }

    async goForCheckout() {
        console.log('💳 Proceeding to checkout')
        await this.checkoutButton.click()
        await this.page.waitForURL(/.*\/order\?.*/)
        console.log('💳 Checkout URL:', this.page.url())
    }
}

export default CartPage
