export default class apiUtils {
    constructor(apiContext) {
        this.apiContext = apiContext
    }

    async getToken() {
        const response = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
            data: {
                userEmail: 'anshika@gmail.com',
                userPassword: 'Iamking@000',
            },
        })
        const responseBody = await response.json()
        return responseBody.token
    }

    async placeOrder(token, productId) {
        const maxRetries = 3
        const timeout = 30000 // 30 seconds

        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                const response = await this.apiContext.post(
                    'https://rahulshettyacademy.com/api/ecom/order/create-order',
                    {
                        headers: {
                            Authorization: `${token}`,
                            'Content-Type': 'application/json',
                        },
                        data: { orders: [{ country: 'India', productOrderedId: productId }] },
                        timeout,
                    },
                )
                return response
            } catch (error) {
                if (attempt === maxRetries) throw error
                await new Promise((resolve) => setTimeout(resolve, 1000 * attempt)) // exponential backoff
            }
        }
    }
}
