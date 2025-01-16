import { expect, test } from "@playwright/test";

/**
 * Lecture 26-32
 * End to End Testing
 * 
 * This end-to-end test covers the following:
 * 1. Login
 * 2. Add item to cart
 * 3. Go to cart
 * 4. Checkout
 * 5. Place order
 * 6. Find the order in the order history page and view the order
 * 7. Assert the order id in the order details page
 */

test("End to End Testing", { tags: ["endToEnd"] }, async ({ page }) => {
    const testData = {
        productName: "IPHONE 13 PRO",
        country: "India",
        successMessage: "Thankyou for the order."
    }

    /**
     * 
     * --- LOGIN PAGE ---
     * 
     */
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("#userEmail").fill("anshika@gmail.com");
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("#login").click();

    const products = page.locator(".card-body");
    await products.first().waitFor({ state: "visible" });

    /**
     * 
     * --- PRODUCTS PAGE ---
     * 
     */

    // Get all the item titles
    const itemTitles = await products.locator("b").allTextContents();
    console.log(`>>> Item titles are '${itemTitles}'`);

    // Get the total count of items
    const totalCountOfItems = await products.count();
    console.log(`>>> Total count of items is ${totalCountOfItems}`);

    // The spinner which appears when we add an item to cart
    const loaderSpinner = page.locator("//div[starts-with(@class,'ngx-spinner')]/div[1]");

    // Select the item and add to cart
    for (let i = 0; i < totalCountOfItems; i++) {
        const item = products.nth(i);
        const itemTitle = await item.locator("b").textContent();
        console.log(`Inside for-loop and item title is ${itemTitle}`);

        if (itemTitle === testData.productName) {
            await item.getByRole("button", { name: "ADD TO CART" }).click();
            await loaderSpinner.waitFor({ state: "visible" });
            await loaderSpinner.waitFor({ state: "hidden" });
            break;
        }
    }

    // Click on the cart icon
    await page.locator("//button[@routerlink='/dashboard/cart']").click();


    /**
     * 
     * --- CART PAGE ---
     * 
     */
    // Get the total items present in the cart
    const cartItems = page.locator("div.cart li");
    await cartItems.first().waitFor({ state: "visible" }); // lets wait for the first item to be visible
    const cartItemsText = await cartItems.locator("h3").allTextContents(); // get the text of all the items in the cart. This will be an array
    console.log(`>>> Cart items text is '${cartItemsText}'`);

    // Check if the item is present in the cart
    expect(cartItemsText).toContain(testData.productName); // this will check if the array contains the product name

    // Click on the checkout button
    await page.locator("//button[normalize-space()='Checkout']").click();

    /**
     * 
     * --- CHECKOUT PAGE ---
     * 
     */

    // Fill the Country field
    await page.getByPlaceholder("Select Country").pressSequentially(testData.country, { delay: 150 });

    // wait for the country dropdown to appear
    const countryDropdown = page.locator("//section/button");
    try {
        await countryDropdown.first().waitFor({ state: "visible" });
    } catch (error) {
        console.log(`>>> Country dropdown is not visible`);
        await page.getByPlaceholder("Select Country").fill('')
        await page.getByPlaceholder("Select Country").pressSequentially(testData.country, { delay: 200 });
    }

    // Select the country
    for (let i = 0; i < (await countryDropdown.count()); i++) {
        const country = countryDropdown.nth(i);
        const countryText = (await country.textContent()).trim(); // Remove any leading or trailing whitespace, like " India" to "India"
        console.log(`>>> Country text is '${countryText}'`);

        if (countryText === testData.country) {
            console.log(`>>> Country text '${countryText}' matched with test data '${testData.country}' and we are clicking on it`);
            await country.click();
            break;
        }
    }

    // Click on "Place Order" button
    await page.locator("//a[normalize-space()='Place Order']").click();

    /**
     * 
     * --- ORDER SUCCESS PAGE ---
     * 
     */

    // Assert the success message
    const successMessage = page.locator("//h1");
    const orderId = await page.locator("//td/label[starts-with(text(),' | ')]").textContent(); // this will return orderId like " | 678763b1e2b5443b1f2412bc | ", and we need to extract the orderId from this
    const extractedOrderId = orderId.split(" | ")[1].trim(); // this will extract the orderId from the orderId string
    console.log(`>>> Extracted order ID is '${extractedOrderId}'`);

    // Assert the success message
    await successMessage.waitFor({ state: "visible" });
    expect((await successMessage.textContent()).trim()).toContain(testData.successMessage);

    /**
     * 
     * --- ASSIGNMENT TO FIND THE ORDER FROM THE ORDER HISTORY PAGE AND ASSERT THE ORDER ID ---
     * 1. Goto Order History Page
     * 2. Find the order with the order id
     * 3. Assert the order id
     */

    // Goto Order History Page
    await page.locator("//button[@routerlink='/dashboard/myorders']").click();

    // Find the order with the order id
    const allOrderRows = page.locator("//tr");
    await allOrderRows.first().waitFor({ state: "visible" }); // lets wait for the first order row to be visible

    for (let i = 0; i < (await allOrderRows.count()); i++) {
        const orderRow = allOrderRows.nth(i); // this will get the order row
        const orderIdFromOrderHistory = await orderRow.locator("//th[1]").textContent(); // this will get the order id from the order history

        if (orderIdFromOrderHistory === extractedOrderId) { // this will check if the order id from the order history matches with the extracted order id
            console.log(`>>> Order ID from order history is '${orderIdFromOrderHistory}' and we are clicking on the view button`);
            await orderRow.getByRole("button", { name: "View", exact: true }).click(); // this will click on the "view" button
            break;
        }
    }

    // Assert the order id in the Order Details Page
    const orderIdInOrderDetailsPage = page.locator("//small/following-sibling::div");
    await orderIdInOrderDetailsPage.waitFor({ state: "visible" });
    expect((await orderIdInOrderDetailsPage.textContent()).trim()).toContain(extractedOrderId);
});
