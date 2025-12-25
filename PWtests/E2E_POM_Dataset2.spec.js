const {test, expect} = require ('playwright/test');
const {POManager} = require('../pageObjects/POManager');
const dataset = JSON.parse(JSON.stringify(require("../utils/testData2.json")));


for (const data of dataset)
{
test(`Place order for ${data.productName}`,async ({page})=>
{
    
    const poManager = new POManager(page);

    const loginPage = poManager.getLoginPage();
    await loginPage.goTo("https://rahulshettyacademy.com/client/dashboard/dash");
    await loginPage.validLogin(data.username,data.password);
    
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.addToCart(data.productName);
    await dashboardPage.navigateToCart();

    const cartOperation = poManager.performCartOperation();
    await cartOperation.verifyAndCheckout(data.productName); //verify item is present and checkout

});
}