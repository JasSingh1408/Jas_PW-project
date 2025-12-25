// // intecepting API responses: by route.fulfill methods

const { test, expect, request } = require('playwright/test');
const { APiUtils } = require('../utils/APiUtils');
const fakePayLoadOrdersPage = { data: [], message: "No Orders" };

// let's save the payload which is json/JS format into a variable. in PW, don't give "" for keys in "key":"value" pairs.

const payload = { userEmail: "jassingh@gmail.com", userPassword: "Rahul@123" };
const orderPayload = { orders: [{ country: "United Kingdom", productOrderedId: "68a961459320a140fe1ca57a" }] };
let response;

// there are 2 of this type - beforeAll and beforeEach. as name suggests

test.beforeAll(async () => {
    // calling the APiUtils class from APiUtils.js where API calls are made to Login and Create Order.
    const apiContext = await request.newContext();
    const apiUtils = new APiUtils(apiContext, payload);
    response = await apiUtils.createOrder(orderPayload);
})

test('@API Network Test', async ({ page }) => {
    // here we will insert our javascript which will store the cookie(token) into the application background.
    // this will behave as UI login
    //const token = apiUtils.getToken();
    await page.addInitScript(value => { window.localStorage.setItem('token', value) }, response.loginToken);
    await page.goto("https://rahulshettyacademy.com/client");

    //In this example, page ROUTE help us to mock the API response of any page to get a desired result on the UI page.
    // intercepting response means - API response -> {PW-Mock Response}-> browser rendering new response on page.

    page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", async route => {
        const response = await page.request.fetch(route.request());
        // page.request.fetch - gets the response from route.request method and then we save it to response variable.
        
        let body = JSON.stringify(fakePayLoadOrdersPage); // this stringify converts JS value string to JSON.
        route.fulfill(
            {
                response,
                body,
            })
    });



    const goToOrders = page.locator("[routerlink*='myorders']").first();
    await goToOrders.click();


    //await page.pause();

    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
    console.log(await page.locator(".mt-4").textContent());
});