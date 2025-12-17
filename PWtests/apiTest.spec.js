const {test, expect, request} = require ('playwright/test');
const {APiUtils} = require('./utils/APiUtils');

// let's save the payload which is json/JS format into a variable. in PW, use don't give "" for keys in "key":"value" pairs.

const payload = {userEmail:"jassingh@gmail.com",userPassword:"Rahul@123"};
const orderPayload = {orders:[{country:"United Kingdom",productOrderedId:"68a961459320a140fe1ca57a"}]};
let response;

// we can remove the login steps by passing the login token of the user before every test
// there are 2 of this type - beforeAll and beforeEach. as name suggests

test.beforeAll( async()=>
{
    const apiContext = await request.newContext();
    const apiUtils = new APiUtils(apiContext,payload);
    response = await apiUtils.createOrder(orderPayload);
})

test('E2E Test',async ({page})=>
{
    // here we will insert our javascript which will store the cookie(token) into the application background.
    // this will behave as UI login
    //const token = apiUtils.getToken();
    await page.addInitScript(value =>{ window.localStorage.setItem('token',value ) },response.loginToken );

    await page.goto("https://rahulshettyacademy.com/client"); 

    const goToOrders = page.locator("[routerlink*='myorders']").first(); 
    await goToOrders.click();

    const allRows = page.locator('tbody tr');
    //const tableRows = allRows.locator("th");

    await allRows.first().waitFor();
    
   await allRows.filter({hasText: response.orderId}).getByRole("button",{name:'View'}).click();
    //await allRows.filter({hasText: cleanOrderId}).getByText("button").first().click();

    await page.pause();

    //const viewOrderId = await page.locator(".col-text").textContent();
    
    //expect(viewOrderId===cleanOrderId).toBeTruthy();

});