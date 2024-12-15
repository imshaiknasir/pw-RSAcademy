// @ts-check
const { test, expect, chromium } = require("@playwright/test");

/**
 * This covers lectures from 1 to 13
 */

test.afterAll(async ({ browser }) => {
  await browser.close();
});

test("Browser Context Playwright Test", async ({ browser }) => {
  const browserContext = await browser.newContext();
  const page = await browserContext.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());
});

test("Page Context Playwright Test", async ({ page }) => {
  await page.goto("https://google.com");
  console.log(await page.title());
  await expect(page).toHaveTitle("Google");
});

test("Fill Login Form with incorrect credentials", async () => {
  const browser = await chromium.launch({ headless: false });
  const browserContext = await browser.newContext();
  const page = await browserContext.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await page.getByRole("textbox", { name: "Username" }).fill("rahulshetty");
  await page.getByRole("textbox", { name: "Password" }).fill("learning");
  await page.getByRole("button", { name: "Sign In" }).click();

  await expect(page.getByRole("strong")).toContainText("Incorrect");
});

test("Fill Login Form with correct credentials", async () => {
  const browser = await chromium.launch({ headless: false });
  const browserContext = await browser.newContext();
  const page = await browserContext.newPage();

  /**
   * Reusable code
   */
  const Username = "rahulshettyacademy";
  const Password = "learning";
  const usernameElement = page.getByRole("textbox", { name: "Username" });
  const passwordElement = page.getByRole("textbox", { name: "Password" });
  const signInButton = page.getByRole("button", { name: "Sign In" });

  /**
   * Login with incorrect credentials
   */
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await usernameElement.fill("rahulshetty");
  await passwordElement.fill(Password);
  await signInButton.click();
  // Check if the error message is displayed
  await expect(page.getByRole("strong")).toContainText("Incorrect");

  /**
   * Login with correct credentials
   */
  await usernameElement.fill(Username);
  await passwordElement.fill(Password);
  await signInButton.click();
  // Check if the first product is displayed
  await expect(page.locator("//h4[@class='card-title']").first()).toContainText(
    "iphone X"
  );
});

test("Accessing the Dashboard", async ({ page }) => {
  /**
   * Reusable code
   */
  const Username = "rahulshettyacademy";
  const Password = "learning";
  const usernameElement = page.getByRole("textbox", { name: "Username" });
  const passwordElement = page.getByRole("textbox", { name: "Password" });
  const signInButton = page.getByRole("button", { name: "Sign In" });
  const productsLocator = page.locator("//h4[@class='card-title']");

  /**
   * Login with correct credentials
   */
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await usernameElement.fill(Username);
  await passwordElement.fill(Password);
  await signInButton.click();

  await productsLocator.first().waitFor();

  // Lets List all the products using for each loop
  const products = await productsLocator.all();
  for (const product of products) {
    console.log(await product.innerText());
  }
});
