/** @typedef {import('@playwright/test').Page} Page */

class LoginPage {
    /**
     * @param {Page} page
     */
    constructor(page) {
        this.page = page
        this.usernameInput = this.page.getByPlaceholder('email@example.com')
        this.passwordInput = this.page.getByPlaceholder('enter your passsword')
        this.loginButton = this.page.getByRole('button', { name: 'Login' })
    }

    async goto() {
        console.log('🌐 Navigating to login page')
        await this.page.goto('https://rahulshettyacademy.com/client')
    }

    async login(username, password) {
        console.log('🔑 Logging in with:', username)
        await this.usernameInput.fill(username)
        await this.passwordInput.fill(password)
        await this.loginButton.click()
    }
}

export default LoginPage
