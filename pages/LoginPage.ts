import { Page, Locator } from "@playwright/test";

export default class LoginPage {

    readonly page: Page
    readonly navigateToLoginBtn: Locator;
    readonly userName: Locator;
    readonly password: Locator;
    readonly loginBtn: Locator;
    readonly userInfo: Locator;
    readonly subscriptionTextBox: Locator;
    readonly subscribeButton: Locator;
    readonly subscriptionMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.navigateToLoginBtn = page.getByRole('link', { name: 'Log in' });
        this.userName = page.locator('#Email');
        this.password = page.locator('#Password');
        this.loginBtn = page.locator('.button-1.login-button');
        this.userInfo = page.getByRole('link', { name: 'adminuser@hooli.com' });
        this.subscriptionTextBox = page.locator("[name='NewsletterEmail']");
        this.subscribeButton = page.locator('.newsletter-subscribe-button');
        this.subscriptionMessage = page.locator('.newsletter-result-block');
    }

    async NavigateToUrl(url: string) {
        await this.page.goto(url);
    }

    async NavigateToLoginPage() {
        await this.navigateToLoginBtn.click()
    }
    async enterCredentials(username: string, password: string) {
        await this.userName.pressSequentially(username, { delay: 100 });
        await this.password.pressSequentially(password, { delay: 100 });
    }

    async clickLogin() {
        await this.loginBtn.click()
    }

    async registerForSubscription(email: string) {
        await this.subscriptionTextBox.pressSequentially(email, { delay: 100 });
        await this.subscribeButton.click();
    }
}