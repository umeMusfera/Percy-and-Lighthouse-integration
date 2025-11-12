import { test, expect } from "@playwright/test";
import percySnapshot from "@percy/playwright";

// 👉 Replace these with your actual store URL and password
const STORE_URL = "https://thapas-technical.myshopify.com/";
const STORE_PASSWORD = "ss";

async function unlockStore(page) {
  await page.goto(`${STORE_URL}/`);
  await page.fill('input[name="password"]', STORE_PASSWORD);
  await page.click('button[type="submit"]');
//   await page.waitForLoadState("networkidle");
  console.log("✅ Store unlocked successfully!");
}

test.describe("Shopify Visual Regression Tests", () => {
  test("Homepage snapshot", async ({ page }) => {
    await unlockStore(page);
    await page.goto(STORE_URL);

    // Wait for hero/banner section to load
    await expect(page.locator("body")).toBeVisible();

    // Percy visual snapshot
    await percySnapshot(page, "Home");

    console.log("📸 Percy snapshot taken for Homepage");
  });

});
