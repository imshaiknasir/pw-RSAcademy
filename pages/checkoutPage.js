/** @typedef {import('@playwright/test').Page} Page */

class CheckoutPage {
    /**
     * @param {Page} page
     */
    constructor(page) {
        this.page = page
        this.countryInput = this.page.getByPlaceholder('Select Country')
        this.countryNames = this.page.locator('button.list-group-item')
        this.placeOrderButton = this.page.getByText('PLACE ORDER')
    }

    async enterCountryAndSelect(country) {
        console.log('🌍 Entering country:', country)
        await this.countryInput.waitFor({ state: 'visible' })
        await this.countryInput.pressSequentially(country, { delay: 100 })
    }

    async selectCountry(country) {
        console.log('🌍 Selecting country from dropdown')
        await this.countryNames.first().waitFor({ state: 'visible' })
        const countryNames = await this.countryNames.all()
        for (const countryName of countryNames) {
            console.log('🌍 Checking country:', await countryName.innerText())
            if ((await countryName.innerText()).trim() === country) {
                await countryName.click()
                break
            }
        }
    }

    async placeOrder() {
        console.log('📦 Placing order')
        await this.placeOrderButton.click()
    }

    async assertOrderSuccess() {
        console.log('🎉 Verifying order success')
        await this.page.getByText('Thankyou for the order.').waitFor({ state: 'visible' })
        return true
    }
}

export default CheckoutPage
