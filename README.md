# Newcastle_Jets
Test cases to test the functionality of the login page

# Tech Stack:
* E2E Test Tool - Playwright
* Reporting tool - Built in Playwright reporters
* Language - TypeScript

# Setup
* If you don't have npm already install you will need to run the terminal command:
    ```
    npm install -g npm
    ```
* You will then need to install the project dependencies:
    ```
    npm i
    ```

# Running the tests
To run all the tests use the commands: 

```
npx playwright test
```
or if you would like to see the test results in terminal rather than running the reporter seperatley use the command: 

```
npx playwright test --reporter=list
```
to run single tests you can add the test name to the command e.g.

```
npx playwright test loginPage-functional.spec.ts
```
or 

```
npx playwright test loginPage-functional.spec.ts --reporter=list
```

The current configuration of the run file runs the tests against desktop browsers: Chromium, Firefox & Safari. They are also run against mobile web browsers Chrome & Safari on a Pixel 5, Galaxy S III, iPhone 12 & iPhone 6. These are set in playwright.config.ts

# Viewing the test results
Once the tests are run you can view the results running the command: 

```
npx playwright show-report
```

The current configuration for the test reporter is the default Playwright one. This could be updated depending on who needs access to results and the information required. Alternatives include [Allure](https://github.com/allure-framework/), [Monocart](https://cenfun.github.io/monocart-reporter/) etc.

Current test results view:
![Image of the test report page](/images/testResults.png)




