class LoginPage {

    constructor(page)
    {
        this.page = page;
        this.signButton = page.getByRole('button',{name:'Login'});
        this.password = page.getByPlaceholder('enter your passsword');
        this.UserName = page.getByPlaceholder('email@example.com');
    }

async goTo(url)
{
    await this.page.goto(url);
    
}

async validLogin(username,password)
{
    await this.UserName.fill(username);
    await this.password.fill(password);
    await this.signButton.click();
    await this.page.waitForLoadState('networkidle');
}
}

module.exports = {LoginPage};