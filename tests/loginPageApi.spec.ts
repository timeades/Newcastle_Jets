/* 
Due to time constraints and being out of action for a couple of days this section is light.
I should have included tests to check the return from login
{username: "tim.eades@mac.com", password: "foobar", rememberMe: false, forward: null, schoolId: null,…}
forward: null
password: "foobar"
rememberMe: false
schoolId: null
timezoneOffset: 0
username: "tim.eades@mac.com"
and also a GET request on https://www.hudl.com/api/v2/teams/320073/events?returnFull=false and
https://www.hudl.com/api/v2/teams/320073/season-views
*/

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

