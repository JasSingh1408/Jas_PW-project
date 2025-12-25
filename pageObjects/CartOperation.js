class CartOperation {

    constructor(page) {
        this.page = page;
        this.Checkout = page.getByRole('button', {name:'Checkout'});
    }

    async verifyAndCheckout(productName) {
        //await expect(page.getByText(productName)).toBeVisible();    
        await this.Checkout.click();

    }

}

module.exports = {CartOperation};