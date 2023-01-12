import { test, expect } from "@playwright/test";
import { LoginComponent } from "./utils/helpers/loginComponents";
import {
    userEmail,
    userPassword,
    userEmailBad,
    userPasswordBad,
    userEmailLong,
    userPasswordLong,
}   from "./utils/constants/users";
import { baseUrl } from "./utils/constants/urls";

test.beforeEach(async ({ page }) => {
    await page.goto(`${baseUrl}`);
});

test.describe('Happy Path Login', () => {
    test('Hudl login page has correct title and inputs ', async ({ page }) => {
        
        await expect(page).toHaveTitle(/Log In/);
        expect(LoginComponent.emailInput).toBeTruthy();
        expect(LoginComponent.passwordInput).toBeTruthy();
        expect(LoginComponent.rememberMe).toBeTruthy();

    });

    test('login user', async ({ page }) => {
        
        await page.fill(LoginComponent.emailInput, userEmail);
        await page.fill(LoginComponent.passwordInput, userPassword);
        await page.locator(LoginComponent.logIn).click();
        await expect(page).toHaveTitle(/Library - Hudl/);
    });
});

test.describe('Login incorrect credentials', () => {
    test('login with wrong email', async ({ page }) => {
        
        await page.fill(LoginComponent.emailInput, userEmailBad);
        await page.fill(LoginComponent.passwordInput, userPassword);
        await page.locator(LoginComponent.logIn).click();
        expect(LoginComponent.errorDisplay).toBeTruthy();

    });

    test('login with wrong password', async ({ page }) => {
        
        await page.fill(LoginComponent.emailInput, userEmail);
        await page.fill(LoginComponent.passwordInput, userPasswordBad);
        await page.locator(LoginComponent.logIn).click();
        expect(LoginComponent.errorDisplay).toBeTruthy();
    });
});
