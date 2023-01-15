import { test, expect, type Page } from '@playwright/test';
import { 
    emailInput,
    passwordInput,
    logIn,
    rememberMe,
    needHelp,
    errorDisplay,
    orgLogIn,
    passwordReset,
    sendRequest,
    resetPasswordHeadline
} from "./utils/helpers/loginComponents";
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
        await page.fill(emailInput, userEmail); 
        await page.fill(passwordInput, userPassword);
        await page.locator(rememberMe).check();
        await page.locator(logIn).click();
        // expecting the error-display rather than the title of the homePage
        expect(errorDisplay).toBeTruthy();

    });
});
