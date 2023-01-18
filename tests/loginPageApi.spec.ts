import { test, expect} from "@playwright/test";
import {
  emailInput,
  passwordInput,
  logIn,
  rememberMe,
  errorDisplay,
} from "./utils/helpers/loginComponents";
import { userEmail, userPassword } from "./utils/constants/users";
import { baseUrl, logData } from "./utils/constants/urls";

test.beforeEach(async ({ page }) => {
  await page.goto(`${baseUrl}login?forward=%2Flibrary%2F320073`);
});

test.describe("api tests", () => {
  test("login service down", async ({ page }) => {
    // Setting the login service to return a 404
    await page.route(`${baseUrl}login?forward=%2Flibrary%2F320073`, (route) =>
      route.fulfill({
        status: 404,
      })
    );
    //using the same credentials as the happy path test
    await page.fill(emailInput, userEmail);
    await page.fill(passwordInput, userPassword);
    await page.locator(rememberMe).check();
    await page.locator(logIn).click();
    // expecting the error-display rather than the title of the homePage
    expect(errorDisplay).toBeTruthy();
  });

  test("check return from service", async ({ page, request }) => {
    //using the same credentials as the happy path test
    await page.fill(emailInput, userEmail);
    await page.fill(passwordInput, userPassword);
    await page.locator(rememberMe).check();
    await page.locator(logIn).click();

    const _response = await request.get(`${logData}`, {
      params: {
        loggerName: "'HudlLibrary'",
        message: "Loaded V3 library",
      },
    });
    expect(_response.ok()).toBeTruthy();
    expect(_response.status()).toBe(201);
  });

});

