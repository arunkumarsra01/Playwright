import { test, expect } from '@playwright/test'

test('test', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.locator('#login-button').click();
    const product = page.getByText('Sauce Labs Backpack')
    await expect(product).toHaveText('Sauce Labs Backpack')
})