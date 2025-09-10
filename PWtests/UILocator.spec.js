const {test, expect} = require ('@playwright/test');

test('Get error message',async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); 
    
    // to get the page title
    console.log(await page.title());
    const userName = page.locator('input#username');
    const SignBtn = page.locator('#signInBtn')
    //assertion
    

    /// locator can be found on the UI using css and xpath. But css is default and mostly used in PW.
    //await userName.fill('rahulsetting');
    await page.locator('[name=password]').fill('learning');
    //await SignBtn.click();

    /// to extract the content of the operator
    //console.log(await page.locator("[style*='block']").textContent());
    //await expect(page.locator("[style*='block']")).toContainText('Incorrect username/password');

    //await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await SignBtn.click();

    //to validate the first element (i.e 0th element in index) use nth(0,1,2,3) or first()/last() before the action to be peformed.
    console.log(await page.locator(".card-body a").first().textContent());
    console.log(await page.locator(".card-body a").nth(3).textContent());

    const allText = await page.locator(".card-body a").allTextContents();
    console.log(allText);
   


});