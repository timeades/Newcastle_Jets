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

test.describe('Happy Path Login', () => {
    test('Hudl login page has correct title and inputs ', async ({ page }) => {    
        await expect(page).toHaveTitle(/Log In/);
        expect(LoginComponent.emailInput).toBeTruthy();
        expect(LoginComponent.passwordInput).toBeTruthy();
        expect(LoginComponent.rememberMe).toBeTruthy();
        await page.route('https://www.hudl.com/login', (route) => 
        route.fulfill({
            status: 200,
        }));

    });

    test('login user', async ({ page }) => {       
        await page.fill(LoginComponent.emailInput, userEmail);
        await page.fill(LoginComponent.passwordInput, userPassword);
        await page.locator(LoginComponent.rememberMe).check();
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

test.describe('Forgotten password routine from login page', () => {
    test('Page components present and in correct state', async ({ page }) => {   
        await page.locator(LoginComponent.needHelp).click();
        //expect(page.(LoginComponent.passwordReset)).toBeTruthy();


    });
});

