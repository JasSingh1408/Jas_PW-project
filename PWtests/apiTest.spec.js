const {test, expect, request} = require ('playwright/test');

// let's save the payload which is json/JS format into a variable. in PW, use don't give "" for keys in "key":"value" pairs.

const payload = {userEmail:"jassingh@gmail.com",userPassword:"Rahul@123"};
const orderPayload = {orders:[{country:"United Kingdom",productOrderedId:"68a961459320a140fe1ca57a"}]};
let loginToken;
let orderId;

// we can remove the login steps by passing the login token of the user before every test
// there are 2 of this type - beforeAll and beforeEach. as name suggests
test.beforeAll( async()=>
{
const apiContext = await request.newContext();
const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",

    {
        data: payload
    })
expect((loginResponse).ok()).toBeTruthy();
const loginResponseJson = await loginResponse.json();
loginToken = loginResponseJson.token;
console.log(loginToken);

//order-creation

const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
    {
        data:orderPayload,
        headers:
        {
            'Authorization': loginToken,
            'Content-Type': 'application/json'   
        }
    })

expect((orderResponse).ok()).toBeTruthy();
const orderResponseJson = await orderResponse.json();
console.log(orderResponseJson);
orderId = orderResponseJson.orders[0];
console.log(orderId);
});


test('E2E Test',async ({page})=>
{
    // here we will insert our javascript which will store the cookie(token) into the application background.
    // this will behave as UI login
    
    await page.addInitScript(value =>{

       window.localStorage.setItem('token',value ) 
    },loginToken );

    await page.goto("https://rahulshettyacademy.com/client"); 

    const goToOrders = page.locator("[routerlink*='myorders']").first(); 
    await goToOrders.click();

    const allRows = page.locator('tbody tr');
    //const tableRows = allRows.locator("th");

    await allRows.first().waitFor();
    
   await allRows.filter({hasText: orderId}).getByRole("button",{name:'View'}).click();
    //await allRows.filter({hasText: cleanOrderId}).getByText("button").first().click();

    await page.pause();

    //const viewOrderId = await page.locator(".col-text").textContent();
    
    //expect(viewOrderId===cleanOrderId).toBeTruthy();

});