import LoginPage from "./loginPage";
import DashboardPage from "./dashboardPage";
import CartPage from "./cartPage";
import CheckoutPage from "./checkoutPage";

class PageObjManager {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.checkoutPage = new CheckoutPage(this.page);
    }

    async getloginPage() {
        return this.loginPage;
    }

    async getDashboardPage() {
        return this.dashboardPage;
    }

    async getCartPage() {
        return this.cartPage;
    }

    async getCheckoutPage() {
        return this.checkoutPage;
    }
}

export default PageObjManager;
