// Blocking any of the API calls like ".js" or ".css" or others: by route.abort methods. Also to block the files to load use {file extensions}
// part 2 - to get all the requests and responses in logs - console logs. "page.on" can be used.
const { test, request} = require('playwright/test');


test("network_block", async ({ page }) => {

    // page.route("**/*.css", route => route.abort); -- to abort css but this blocks other items also.

    //page.route("**/*.{jpg,png,jpeg}", route => route.abort()); // to block file types.

    page.on('request', request => console.log(request.url()));
    page.on('response', response => console.log(response.url(), response.status()));

    await page.goto("https://rahulshettyacademy.com/client/dashboard/dash"); 
    
    // to get the page title
    console.log(await page.title());
    const email = "jassingh@gmail.com"
    const userName = page.locator('#userEmail');
    const passWord = page.locator('#userPassword');
    const SignBtn = page.locator('#login');

    await userName.fill(email);
    await passWord.fill('Rahul@123');
    await SignBtn.click();
    await page.waitForLoadState('networkidle');


    
    await page.pause();

})