import { expect, test } from "@playwright/test";

test("Page navigation validations", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/", { waitUntil: "domcontentloaded" });
  await page.goto("https://google.com/", { waitUntil: "domcontentloaded" });

  await page.goBack();
  expect(await page.title()).toEqual("Practice Page");

  await page.goForward();
  expect(await page.title()).toEqual("Google");
})

test("Element visible validations", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  await expect(page.getByPlaceholder("Hide/Show Example")).toBeVisible();
  await page.locator("input#hide-textbox").click();
  await expect(page.getByPlaceholder("Hide/Show Example")).toBeHidden();
})

test("Handling javascript alerts", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

  // Alert handling
  await page.locator("input#name").fill("John Doe");
  page.once("dialog", async (dialog) => {
    console.log(dialog.message());
    expect(dialog.message()).toEqual("Hello John Doe, share this practice page and share your knowledge");
    expect(dialog.type()).toEqual("alert");
    await dialog.dismiss();
  })
  await page.locator("input#alertbtn").click()

  // Confirmation handling
  await page.locator("input#name").fill("John Doe");
  page.once("dialog", async (dialog) => {
    console.log(dialog.message());
    expect(dialog.message()).toEqual("Hello John Doe, Are you sure you want to confirm?");
    expect(dialog.type()).toEqual("confirm");
    await dialog.dismiss();
  })
  await page.locator("input#confirmbtn").click()
})

test("Handling mouse hover", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

  await page.locator("#mousehover").hover();
  await expect(page.locator("//a[text()='Top']")).toBeVisible();
  await page.locator("//a[text()='Top']").click();

  await page.locator("#mousehover").hover();
  await expect(page.locator("//a[text()='Reload']")).toBeVisible();
})

test("Handling iframes", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

  const thisFrame = page.frameLocator("#courses-iframe")
  await thisFrame.locator("//a[text()='All Access plan']").first().click()
  const numberOfSubscribers = await thisFrame.locator("//div[@class='text']/h2").textContent()
  const numberOfSubscribersNumber = numberOfSubscribers.split(" ")[1]
  console.log({ numberOfSubscribersNumber })
  expect(numberOfSubscribersNumber).toBe("13,522")
})