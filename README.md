# Playwright Test Automation Framework for [RSAcademy](https://www.udemy.com/course/playwright-tutorials-automation-testing/)

[![Playwright Tests](https://github.com/imshaiknasir/pw-RSAcademy/actions/workflows/playwright-tests.yml/badge.svg)](https://github.com/imshaiknasir/pw-RSAcademy/actions)

This repository contains an automated testing framework built with Playwright for both UI and API testing.

## Directory structure

```
pw-RSAcademy/
├── README.md
├── package.json
├── playwright.config.js
├── .github/
│   └── workflows/
│       └── playwright-tests.yml
├── src/
│   ├── api/
│   ├── pages/
│   │   └── ....js
│   └── utils/
│       └── ....js
├── tests/
│   ├── api/
│   │   └── ....spec.js
│   └── ui/
│       └── ....spec.js
├── test-data/
│   └── ....xlsx
├── playwright-report/
└── test-results/
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