# Playwright Test Automation Framework for [RSAcademy](https://www.udemy.com/course/playwright-tutorials-automation-testing/)

[![Playwright Tests](https://github.com/imshaiknasir/pw-RSAcademy/actions/workflows/playwright-tests.yml/badge.svg)](https://github.com/imshaiknasir/pw-RSAcademy/actions)

This repository contains an automated testing framework built with Playwright for both UI and API testing.

## Directory structure

```
pw-rsacademy/
├── _config.yml
├── package.json
├── package-lock.json
├── playwright.config.js
├── README.md
├── state.json
├── .github
│   └── workflows
│       └── playwright-tests.yml
└── tests
    ├── api_tests
    │   ├── ApiTest_ByAbortingNetworkCalls.spec.js
    │   ├── ApiTest_ByMockingTheRequest.spec.js
    │   ├── ApiTest_ByMockingTheResponse.spec.js
    │   ├── ApiTest_standalone.spec.js
    │   └── ApiTest_usingUtils.spec.js
    ├── basic_tests
    │   ├── automationPractice.spec.js
    │   ├── ClientAppOtherWay.spec.js
    │   ├── ClientApp.spec.js
    │   ├── endToEnd_UI.spec.js
    │   ├── handlingCalendar.spec.js
    │   ├── LoginUsing_StorageState.spec.js
    │   ├── playwrightLocators.spec.js
    │   ├── screenshot.spec.js
    │   ├── screenshot.spec.js-snapshots
    │   │   └── screenshots-element-screenshot-linux.png
    │   ├── UIBasicstest.spec.js
    │   ├── visualTesting.spec.js
    │   └── visualTesting.spec.js-snapshots
    │       ├── screenshots-flight-booking-header-linux.png
    │       └── screenshots-flight-booking-page-linux.png
    └── utils
        └── API_Utils.js
```

## Setup

1. Clone the repository
2. Install dependencies:
```bash
npm ci && npx playwright install chromium
```

## Running Tests

Execute all tests:
```bash
npx playwright test
```

## Test Reports

- HTML reports are generated in the `playwright-report` directory
- Test results are stored in the `test-results` directory

## CI/CD

This project uses GitHub Actions for continuous integration. You can view the latest test execution reports here:
[GitHub Actions Reports](https://github.com/imshaiknasir/pw-RSAcademy/actions)

To view the latest test report:
1. Select the latest workflow run from the Actions tab
2. Download the playwright-report artifact
3. Extract the downloaded zip file
4. Run the following command to view the report:
```bash
npx playwright show-report <path-to-extracted-folder>
```

The workflow runs all Playwright tests on push and pull request events, ensuring code quality and test coverage.
