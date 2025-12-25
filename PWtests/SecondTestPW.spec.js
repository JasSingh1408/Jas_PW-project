const {test, expect} = require ('playwright/test');

test('Get first product name',async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/client/dashboard/dash"); 
    
    // to get the page title
    console.log(await page.title());
    const userName = page.locator('#userEmail');
    const passWord = page.locator('#userPassword');
    const SignBtn = page.locator('#login');
    const cards = page.locator('.card-body b');
    //assertion
    

    /// locator can be found on the UI using css and xpath. But css is default and mostly used in PW.
    await userName.fill('jassingh@gmail.com');
    await passWord.fill('Rahul@123');
    await SignBtn.click();

    //console.log(await cards.first().textContent());
    //console.log(await page.locator(".card-body a").nth(3).textContent());
    await page.waitForLoadState('networkidle');
    
    const allText = await cards.allTextContents();
    console.log(allText);
});
//training exercise - 18
test('UIControls name',async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    
    //console.log(await page.title());
    const userName = page.locator('#username');
    const SignBtn = page.locator('#signInBtn');
    const passWord = page.locator('#password');   
    const dropdown = page.locator('select.form-control'); // used tagName.class as only .class is returning more than 1 elements in dom
  
    await userName.fill('rahulshettyacademy');
    await passWord.fill('learning');
    // for dropdown options - use .selectOption and provide internal value, 
    // if we want to use the name of dropdown options displayed on the UI. use {label = 'name'}
    await dropdown.selectOption({label: 'Consultant'});

    //to select a radio button
    await page.locator(".radiotextsty").last().click();
    
    // to handle the web based popup
    await page.locator("#okayBtn").click();

    //to assert that the radio button is checked use "toBeChecked". if we have to get True/False output in console, we can use "isChecked" for the logging
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    //await page.pause();
    //await SignBtn.click();
    
    // to select checkbox on the UI

    const terms = page.locator("#terms");
    await terms.click();
    await expect(terms).toBeChecked();
    //await page.pause();
    await terms.uncheck();
    //await page.pause();

    //to verify/assert the boolean outcomes. we can use the commands - .toBeFalsy or toBeTruthy

    expect(await terms.isChecked()).toBeFalsy();

    // if we see above the await is in the brackets but for others, the await is outside. 
    // reason - await comes within the actions scope see line 67 where the actions is "isCheked" inside the bracket

});

test.only('BlinkTest case',async ({browser})=>
{

    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   
    //to check the attributes are present, use ".toHaveAttribute"
    const docLink = page.locator("[href*='documents-request']");
    await expect(docLink).toHaveAttribute("class","blinkingText");

    //when working on newpage:
    // we have inform the code that new page is coming in the context of the browser. so we use context.waitForEvent("page"), see below.
    // but when we inform the code that new page is opening then it start looking for new page not before. so we do the click action after informing line.

    // Lecture 21  - the below 2 lines of code need to be executed asynchronously as the page2 will not get value if the click function is not executed.
    // here we introduce Promise (pending,rejected,fulfilled) where the lines will work async mode to get all the lines into it to be fulfilled.
    // promise work in array mode where all the lines are considered as one array element
    // [termPage] is the name of the array

    const [termPage] = await Promise.all([
    context.waitForEvent('page'),// listening for new page
    docLink.click(),
    ])

    // the above 2 steps have to be fulfilled for the array to come out. 
    const text = await  termPage.locator(".red").textContent();

    //how to split the string/text - text.split("delimiter") where left side string will be in index 0 and right side string in index 1.
    const arraytext = text.split("@")
    const domain = arraytext[1].split(".")[0]
    //console.log(domain);

    await userName.fill(domain);
    //await page.pause();

    //chapter 22 - when we enter a value in a text box, ".textContent" will not return any value as the value entered is not part of dom but user inserted it.
    // to find the value inserted by the script use ".inputValue" - see example below.

    console.log(await userName.inputValue());
    //await page.pause();

});