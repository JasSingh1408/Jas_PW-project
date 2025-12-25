class DashboardPage {

    constructor(page) {
        this.page = page;
        this.productCards = page.locator('.card-body');

    }

    async addToCart(productName) {
        await this.productCards.filter({ hasText: productName }).getByRole('button', { name: 'Add to Cart' }).click();

    }

    async navigateToCart() {
        await this.page.getByRole("listitem").getByRole("button", { name: "Cart" }).click();
    }
}

module.exports = {DashboardPage};