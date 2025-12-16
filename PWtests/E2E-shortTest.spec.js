const {test, expect} = require ('playwright/test');

test('E2E Test',async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/client/dashboard/dash"); 
    
    // to get the page title
    console.log(await page.title());
    const email = "jassingh@gmail.com"
    
    const userName = page.getByPlaceholder('email@example.com');
    const passWord = page.getByPlaceholder('enter your passsword');
    const SignBtn = page.getByRole('button',{name:'Login'});
    
    const productCards = page.locator('.card-body');
    const productName = 'ZARA COAT 3'

    const goToOrders = page.locator("[routerlink*='myorders']").first();    

    // locator can be found on the UI using css and xpath. But css is default and mostly used in PW.
    await userName.fill(email);
    await passWord.fill('Rahul@123');
    await SignBtn.click();
    await page.waitForLoadState('networkidle');
    //await page.pause();
    //getByText('ZARA COAT')
    
    
    await productCards.filter({hasText: productName}).getByRole('button', {name: 'Add to Cart'}).click();

    await page.getByRole("listitem").getByRole("button", {name: "Cart"}).click();

    //verify item is present
    
    await expect(page.getByText(productName)).toBeVisible();    
    await page.getByRole('button', {name:'Checkout'}).click();
    
    // getByRole('button', { name: 'Checkout❯' })

    await page.locator('.ddl').nth(0).selectOption("04");
    await page.locator('.ddl').nth(1).selectOption("20");
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
    await page.getByPlaceholder('Select Country').pressSequentially("indi",{delay:100});
    //await page.locator('.ta-results .fa-search').first().click(); 

    await page.getByRole('button',{name:'India'}).nth(1).click();
//await expect(page.locator('.user__name .form-group')).toContainText('United Kingdom');

   


    //click on place order
    await page.getByText("PLACE ORDER").click();
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

    await allRows.filter({hasText: cleanOrderId}).getByRole("button",{name:'View'}).click();
    //await allRows.filter({hasText: cleanOrderId}).getByText("button").first().click();

    

    const viewOrderId = await page.locator(".col-text").textContent();
    
    expect(viewOrderId===cleanOrderId).toBeTruthy();

    //Click on view of matching order id

    //expect(orderId).toContain(firstOrderId);

    //await page.pause();
});