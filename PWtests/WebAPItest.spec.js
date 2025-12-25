const {test, expect} = require ('playwright/test');
let webContext;


test.beforeAll( async({browser})=>
{
    const browserContext = await browser.newContext();
    const page = await browserContext.newPage();
    const email = "jassingh@gmail.com"
    const userName = page.locator('#userEmail');
    const passWord = page.locator('#userPassword');
    const SignBtn = page.locator('#login');

    await page.goto("https://rahulshettyacademy.com/client/"); 
    await userName.fill(email);
    await passWord.fill('Rahul@123');
    await SignBtn.click();
    await page.waitForLoadState('networkidle');

    await browserContext.storageState({path: 'pwState.json'}); 
    webContext = await browser.newContext({storageState: 'pwState.json'});

})

test('API_E2ETest',async () =>
{
    const page = await webContext.newPage();

    await page.goto("https://rahulshettyacademy.com/client/dashboard/dash"); 
    
    // to get the page title
    console.log(await page.title());
    const productCards = page.locator('.card-body');
    const selectProduct = page.locator('fa');
    const addToCart = page.locator('.w-10');
    const goToCart = page.locator("[routerlink*='cart']");
    const checkoutBtn = page.locator('.totalRow .btn-primary');
    const cvvNcoupon = page.locator('.small .txt');
    const productName = 'ZARA COAT 3'
    const goToOrders = page.locator("[routerlink*='myorders']").first();        
    
    const productCount = await productCards.count();  // to get the count of elements under any locator
    console.log(productCount);
    

    for(let i =0; i < productCount; ++i)
    {
    if(await productCards.nth(i).locator("b").textContent() === productName)  // to get the child under a specific parent locator scope.
    {
        await productCards.nth(i).locator("text= Add To Cart").click();
        break;
    }
    }
    await goToCart.click();

    //verify item is present
    
    await checkoutBtn.click();
    
    // getByRole('button', { name: 'Checkout❯' })

    await page.locator('.ddl').nth(0).selectOption("04");
    await page.locator('.ddl').nth(1).selectOption("04");
    await page.locator('.small .txt').nth(0).fill("111");

    await page.locator("[name='coupon']").fill("rahulshettyacademy");
    await page.locator("[type='submit']").click();
    
    await expect(page.locator('.small .ng-star-inserted')).toContainText('* Coupon Applied');

    //verify "* Coupon Applied" message

    // confirm that the login email is displayed on the checkout page
    //await page.pause();
    console.log(await page.locator('.user__name .input').first().inputValue());
    

    //Enter the country and select from auto-suggestion
    await page.locator('.user__name .form-group').click();
    
    // to fill the data like event of typing the data. But type is deprecated; we use pressSquentially hee
    await page.locator('.user__address .input').pressSequentially("indi",{delay:100});
    //await page.locator('.ta-results .fa-search').first().click(); 

    await page.locator("text = India").first().waitFor();
    await page.locator("text = India").nth(1).click(); 
    console.log(await page.locator('.user__address .input').inputValue());
//await expect(page.locator('.user__name .form-group')).toContainText('United Kingdom');

   


    //click on place order
    const PlcOrd = page.locator('.action__submit');
    await PlcOrd.click();
    //await page.pause();

    // verify THANKYOU FOR THE ORDER
    const ThankYouMessage = page.locator('.hero-primary');
    await expect(ThankYouMessage).toContainText('Thankyou for the order.');
    //await page.pause();

    //capture the orderId
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);
    const cleanOrderId = orderId.replace(/\|/g, '').trim();
    console.log("cleanOrderId is" + cleanOrderId);

    

    // go to order page and verify order present
    
    await goToOrders.click();
    const allRows = page.locator('tbody tr');
    //const tableRows = allRows.locator("th");

    await allRows.first().waitFor();
    
    //const rowCount = await allRows.count();
/*
    for(let i = 0; i < await allRows.count(); ++i)
    {
        const tableOrderId = await allRows.nth(i).locator("th").textContent();
        if (cleanOrderId === tableOrderId)
        {
            await allRows.nth(i).locator('.btn-primary').click();
            
            break;
        }
    }
*/

    await allRows.filter({hasText: cleanOrderId}).getByRole("button",{name:'View'}).click();
    //await allRows.filter({hasText: cleanOrderId}).getByText("button").first().click();

    await page.pause();

    const viewOrderId = await page.locator(".col-text").textContent();
    
    expect(viewOrderId===cleanOrderId).toBeTruthy();

    //Click on view of matching order id

    //expect(orderId).toContain(firstOrderId);

    //await page.pause();
});