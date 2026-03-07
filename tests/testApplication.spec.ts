import { test } from '../Fixtures/LoginFixure'
import { expect } from '@playwright/test'


test('testing dependency injection', async ({ loginpage }) => {
    await expect(loginpage.userInfo).toHaveText('adminuser@hooli.com')
})

test('testing dependency injection-part 2', async ({ loginpage }) => {
    await loginpage.registerForSubscription('adminuser@hooli.com')
    await expect(loginpage.subscriptionMessage).toHaveText('Thank you for signing up! A verification email has been sent. We appreciate your interest.')
});
