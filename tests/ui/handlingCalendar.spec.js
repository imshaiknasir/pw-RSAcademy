import { expect, test } from '@playwright/test'

test('Calendar validations', async ({ page }) => {
    const monthNumber = '6'
    const date = '1'
    const year = '2027'
    const expectedList = [monthNumber, date, year]
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers')
    await page.locator('.react-date-picker__inputGroup').click()
    await page.locator('.react-date-picker__inputGroup').waitFor({ state: 'hidden' })
    await page.locator('.react-calendar__navigation__label').click()
    await page.locator('.react-calendar__navigation__label').click()
    await page.getByText(year).click()
    await page
        .locator('.react-calendar__year-view__months__month')
        .nth(Number(monthNumber) - 1)
        .click()
    await page.locator(`//abbr[text()='${date}']/parent::button[not(contains(@class,'neighboringMonth'))]`).click() // to handle the neighboring month dates

    const inputs = await page.locator('.react-date-picker__inputGroup__input').all()
    const values = await Promise.all(inputs.map((input) => input.getAttribute('value')))
    console.log({ values })

    for (let index = 0; index < values.length; index++) {
        const value = values[index]
        console.log(
            `>> inside for loop, the value received is ${value}, and the expected value is ${expectedList[index]}`,
        )
        expect(value).toEqual(expectedList[index])
    }
})
