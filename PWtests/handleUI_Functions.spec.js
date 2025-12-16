const {test, expect} = require ('playwright/test');

test('dialogs', async ({page}) =>
{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    //

    /* to handle a java/JS dialog on top of the broswser.
    As it is not visible in html dom. we need to accept/reject(dismiss) which are only 2 popup options.
    To perform action on these popups:

    page.on("dialog", dialog => dialog.accept());
    page.on("dialog", dialog => dialog.dismiss());
    */
    page.on('dialog', dialog => dialog.accept());
    await page.locator('#confirmbtn').click();

    // to hoverover on any option on 
    await page.locator('#mousehover').hover();
    await page.getByText('Reload').click();

    await page.pause();

});

// to handle frames on the web application - which have html tag as "iframe" or "frameset". Switch to frame name or id.

test('frames', async ({page}) =>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    const frameSpace = page.frameLocator('#courses-iframe');
    

    /*sometime the ui elements are hidden and need to be avioded. to select only  visible elements use ".visible"
    
    const visibleLifetimeLink = frameSpace.locator("li a[href*='lifetime-access']:visible")
    */


})