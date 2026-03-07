import { test } from '../Fixtures/LoginFixure'
import { expect } from '@playwright/test'


test('testing dependency injection', async ({ loginpage }) => {
    await expect(loginpage.userInfo).toHaveText('adminuser@hooli.com')
})

test('testing dependency injection-part 2', async ({ loginpage }) => {
    await loginpage.registerForSubscription('adminuser@hooli.com')
    await expect(loginpage.subscriptionMessage).toHaveText('Thank you for signing up! A verification email has been sent. We appreciate your interest.')
});


test('Alert hadling', async ({ page }) => {
    await page.goto('https://example.com');
    page.on('dialog', dialog => dialog.accept());
    await page.getByRole('button', { name: 'ClickonAlert' }).click();
})

test('Handling tabs', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage()
    await page.goto('https://example.com');
    const tab = context.waitForEvent('page');
    const newPage = await tab;
    await expect(newPage).toHaveTitle(/demo/)
})
