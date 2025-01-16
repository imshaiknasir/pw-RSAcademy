export class API_Utils {
    constructor(apiContext) {
        this.apiContext = apiContext
    }

    async getToken() {
        const response = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
            data: {
                userEmail: "anshika@gmail.com",
                userPassword: "Iamking@000"
            }
        })
        const responseBody = await response.json()
        return responseBody.token
    }

    async placeOrder(token, productId) {
        const response = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order', {
            headers: {
                'Authorization': `${token}`,
                'Content-Type': 'application/json'
            },
            data: { "orders": [{ "country": "India", "productOrderedId": productId }] }
        })
        return response
    }
}