import { expect, test } from "@playwright/test";

test('@Webst Client App login', async ({ page }) => {
  
  const email = "anshika@gmail.com";
  const password = "Iamking@000";
  const productName = 'IPHONE 13 PRO';
  const products = page.locator(".card-body");

  await page.goto("https://rahulshettyacademy.com/client");
  await page.getByPlaceholder("email@example.com").fill(email);
  await page.getByPlaceholder("enter your passsword").fill(password);
  await page.getByRole('button', { name: "Login" }).click();
  await page.waitForLoadState('networkidle');
  await page.locator(".card-body b").first().waitFor();

  await page.locator(".card-body").filter({ hasText: productName })
    .getByRole("button", { name: "Add to Cart" }).click();

  await page.getByRole("listitem").getByRole('button', { name: "Cart" }).click();

  await page.locator("div li").first().waitFor();
  await expect(page.getByText(productName)).toBeVisible();

  await page.getByRole("button", { name: "Checkout" }).click();

  await page.getByPlaceholder("Select Country").pressSequentially("ind");

  await page.getByRole("button", { name: "India" }).nth(1).click();
  await page.getByText("PLACE ORDER").click();

  await expect(page.getByText("Thankyou for the order.")).toBeVisible();
})