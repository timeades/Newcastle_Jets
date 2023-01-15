import { test, expect, type Page } from '@playwright/test';
import { 
    emailInput,
    passwordInput,
    logIn,
    rememberMe,
    needHelp,
    errorDisplay,
    orgLogIn,
    orgEmailInput,
    orgLoginButton,
    passwordReset,
    sendRequest,
    resetPasswordHeadline,
    resetPasswordButtonD,
    resetPasswordButton,
    emailHelpHeadline,
    emailHelpSubHeadline,
    helpSubHeadline,
    emailSupport,
    loginWithEmailButton,
} from "./utils/helpers/loginComponents";
import {
    userEmail,
    userPassword,
    userEmailBad,
    userPasswordBad,
}   from "./utils/constants/users";
import { baseUrl } from "./utils/constants/urls";

// This sets the url that each of the tests will run against 
test.beforeEach(async ({ page }) => {
    await page.goto(`${baseUrl}`);
});

test.describe('Happy Path Login', () => {
    test('login page has correct title and inputs ', async ({ page }) => {    
        // Checking all elemnets required are present on page
        await expect(page).toHaveTitle(/Log In/);
        expect(emailInput).toBeTruthy();
        expect(passwordInput).toBeTruthy();
        expect(rememberMe).toBeTruthy();
    });

    test('User is logged in', async ({ page }) => {       
        await page.fill(emailInput, userEmail);
        await page.fill(passwordInput, userPassword);
        await page.locator(rememberMe).check();
        await page.locator(logIn).click();
        // Asserting against an element on the home page to confirm login sucess
        await expect(page).toHaveTitle(/Library - Hudl/);
    });

    test('login with an organisation', async ({ page }) => {
        await page.locator(orgLogIn).click();
        await expect(page).toHaveTitle(/Log In with Organization - Hudl/)
        expect (orgEmailInput).toBeTruthy();
        expect (orgLoginButton).toBeTruthy();
        await page.locator(loginWithEmailButton ).click();
        await expect(page).toHaveTitle(/Log In/)
    });
});

test.describe('Login incorrect credentials', () => {
    test('login with wrong email', async ({ page }) => {   
        await page.fill(emailInput, userEmailBad);
        await page.fill(passwordInput, userPassword);
        await page.locator(logIn).click();
        expect(errorDisplay).toBeTruthy();
        page.getByText('We didn\'t recognize that email and/or password.Need help?');
    });

    test('login with wrong password', async ({ page }) => {
        await page.fill(emailInput, userEmail);
        await page.fill(passwordInput, userPasswordBad);
        await page.locator(logIn).click();
        expect(errorDisplay).toBeTruthy();
        page.getByText('We didn\'t recognize that email and/or password.Need help?');
    });
});

test.describe('Forgotten password routine', () => {
    test('From the Need help? link in login form', async ({ page }) => {   
        await page.locator(needHelp).click();
        expect(resetPasswordHeadline).toBeTruthy();
        expect(passwordReset).toBeTruthy();
        expect(resetPasswordButtonD).toBeTruthy();
        expect(emailHelpHeadline).toBeTruthy();
        page.getByText('Let\’s reset your password');
        expect(emailHelpSubHeadline).toBeTruthy();
        page.getByText('Not sure which email address to use?');
        expect(helpSubHeadline).toBeTruthy();
        page.getByText('Didn\'t receive that email from Hudl?');
        expect(emailSupport).toBeTruthy();
        page.getByText('Still having trouble?');
    });

    test('From the needhelp link in error message modal', async ({ page }) => {   
        await page.fill(emailInput, userEmail);
        await page.fill(passwordInput, userPasswordBad);
        await page.locator(logIn).click();
        expect(errorDisplay).toBeTruthy();
        await page.locator(needHelp).click();
        expect(resetPasswordHeadline).toBeTruthy();
        expect(passwordReset).toBeTruthy();
        expect(resetPasswordButton).toBeTruthy();
        expect(emailHelpHeadline).toBeTruthy();
        expect(emailHelpSubHeadline).toBeTruthy();
        expect(helpSubHeadline).toBeTruthy();
        expect(emailSupport).toBeTruthy();
    });
});

