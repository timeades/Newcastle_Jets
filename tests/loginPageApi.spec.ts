import { test, expect, type Page } from '@playwright/test';
import { LoginComponent } from "./utils/helpers/loginComponents";
import {
    userEmail,
    userPassword,
    userEmailBad,
    userPasswordBad,
}   from "./utils/constants/users";
import { baseUrl } from "./utils/constants/urls";
import {
    setLoginApiDown,
    setLoginApiUp
}   from "./utils/api/api";

test.beforeEach(async ({ page }) => {
    await page.goto(`${baseUrl}`);
});

test.describe('api tests', () => {
    test('login service down', async ({ page }) => {   
        // Setting the login service to return a 404
        await page.route(`${baseUrl}`, (route) => 
        route.fulfill({
            status: 404,
        })
        )
        //using the same credentials as the happy path test
        await page.fill(LoginComponent.emailInput, userEmail); 
        await page.fill(LoginComponent.passwordInput, userPassword);
        await page.locator(LoginComponent.rememberMe).check();
        await page.locator(LoginComponent.logIn).click();
        // expecting the error-display rather than the title of the homePage
        expect(LoginComponent.errorDisplay).toBeTruthy();

    });
});
