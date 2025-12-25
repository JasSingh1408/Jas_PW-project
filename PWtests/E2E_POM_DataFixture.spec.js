const {expect} = require ('playwright/test');
const {customtest} = require('./testBase');
const {POManager} = require('../pageObjects/POManager');


customtest('Place order for',async ({page,testDataForOrder})=>
{
    
    const poManager = new POManager(page);

    const loginPage = poManager.getLoginPage();
    await loginPage.goTo("https://rahulshettyacademy.com/client/dashboard/dash");
    await loginPage.validLogin(testDataForOrder.username,testDataForOrder.password);
    
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.addToCart(testDataForOrder.productName);
    await dashboardPage.navigateToCart();

    const cartOperation = poManager.performCartOperation();
    await cartOperation.verifyAndCheckout(testDataForOrder.productName); //verify item is present and checkout

});
