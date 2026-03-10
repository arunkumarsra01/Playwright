import { test as base } from "@playwright/test";
import LoginPage from '../pages/LoginPage'

type LoginFixture = {
    loginpage: LoginPage
}

export const test = base.extend<LoginFixture>({
    loginpage: async ({ browser }, use) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        const loginpage = new LoginPage(page);
        await loginpage.NavigateToUrl("https://demowebshop.tricentis.com/");
        await loginpage.NavigateToLoginPage();
        await loginpage.enterCredentials('adminuser@hooli.com', 'adminuser');
        await loginpage.clickLogin();
        await use(loginpage)
    }
})
