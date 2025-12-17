//class for API utilities and method to get the token

class APiUtils
{
    //creating constructor to invoke the apicontext declared in testcase

    constructor(apiContext,payload)
    {
        this.apiContext = apiContext;
        this.payload=payload;
        // in above this.apiContext is the local or class instance variable which is accessible within the class. 
        // this rfere to current class
        // and apiContext on the right side is the argument used and will be invoked when object of class APIUtils will be created
    
    }
    async getToken()
        {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data: this.payload
            })
        //expect((loginResponse).ok()).toBeTruthy();
        const loginResponseJson = await loginResponse.json();
        const loginToken = loginResponseJson.token;
        console.log(loginToken);
        return loginToken;
    }

    async createOrder(orderPayload)
        {
            let response = {};
            response.loginToken = await this.getToken();
            const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
                {
                    data:orderPayload,
                    headers:
                    {
                        'Authorization': response.loginToken,
                        'Content-Type': 'application/json'   
                    }
                })
            
            //expect((orderResponse).ok()).toBeTruthy();
            const orderResponseJson = await orderResponse.json();
            console.log(orderResponseJson);
            const orderId = orderResponseJson.orders[0];
            response.orderId = orderId;
            console.log(orderId);
            return response;

        }
}
module.exports = {APiUtils};