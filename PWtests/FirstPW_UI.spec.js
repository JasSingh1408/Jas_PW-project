const {test, expect} = require ('@playwright/test');

//const mean constant in javaScript which is dataType in JS.
// expect is coming from annotation and it is a fixture for assertions.

//test('First test',async ()=>
// mentioning async is important if we want await to be playing it role.
//{
//code to test
//step 1 - open browser
// await //await is required to let the executor know that net code cannot run before the above.
//step 2 - enter UN/PSWD
// await 
//await is required to let the executor know that net code cannot run before the above.
//Step 3- click login
//});


// ques - what is fixture in PW? - this are global variables which are available through out PW.
// ({browser}) - is a fixture user below.


test('First test',async ({page})=>
{

    //chrome - installed plugins/cookies/bookmarks are the part of chrome browser. means in browser context. 
    // newContext behave like a new browser window with given settings - like proxy, settings.

    //const context = await browser.newContext(); // a broswer instance is thus created. But page is not yet created.
    //const page = await context.newPage();
    // the above 3 lines are default and can be removed by just mentioning 'page' into the fixture by replacing 'browser'.
    await page.goto("https://google.com"); 
    
    // to get the page title
    console.log(await page.title());

    //assertion
    await expect(page).toHaveTitle("Google");

});


test('First wala test',async ({browser})=>
{

    //chrome - installed plugins/cookies/bookmarks are the part of chrome browser. means in browser context. 
    // newContext behave like a new browser window with given settings - like proxy, settings.

    const context = await browser.newContext(); // a broswer instance is thus created. But page is not yet created.
    const page = await context.newPage();
    await page.goto("https://playwright.dev/docs/intro"); 

});