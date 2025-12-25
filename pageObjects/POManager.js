const { LoginPage } = require('./LoginPage');
const { DashboardPage } = require('./DashboardPage');
const { CartOperation } = require('./CartOperation');

class POManager {

    constructor(page) {
        this.page = page
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.cartOperation = new CartOperation(this.page);

    }
    getLoginPage() {
        return this.loginPage;
    }

    getDashboardPage() {
        return this.dashboardPage;
    }

    performCartOperation() {
        return this.cartOperation;
    }
}

module.exports = { POManager };