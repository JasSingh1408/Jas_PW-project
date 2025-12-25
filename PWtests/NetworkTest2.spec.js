// intecepting API requests: by route.continue methods
// tying to make sure that orders which doesn't belong our account should not be shown. trying to modify the order ID in API.

const { test, request } = require('playwright/test');
const { APiUtils } = require('../utils/APiUtils');

const payload = { userEmail: "jassingh@gmail.com", userPassword: "Rahul@123" };
const orderPayload = { orders: [{ country: "United Kingdom", productOrderedId: "68a961459320a140fe1ca57a" }] };
let response;

test.beforeAll(async () => {
    // calling the APiUtils class from APiUtils.js where API calls are made to Login and Create Order.
    const apiContext = await request.newContext();
    const apiUtils = new APiUtils(apiContext, payload);
    response = await apiUtils.createOrder(orderPayload);
})

test("network_request_change", async ({ page }) => {

    await page.addInitScript(value => { window.localStorage.setItem('token', value) }, response.loginToken);
    await page.goto("https://rahulshettyacademy.com/client");

    const goToOrders = page.locator("[routerlink*='myorders']").first();
    await goToOrders.click();


    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*", route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=69449d7232ed8658713daa42' }));
    // in the above example, the first URL is something which is when clicked, route method need to track it and if it appears,
    // then route.continue can be used to modify any one or more elements of the request like - headers, body, cookies or endpoint.

    await page.locator("button:has-text('View')").nth(0).click();
    // in the above locator, button name changes rarely whereas the Ids gets changes more frequently. 
    // so choose the text of the button in better idea.

    await page.pause();

})