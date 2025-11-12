import { test, expect } from "@playwright/test";
import percySnapshot from "@percy/playwright";

// 👉 Replace these with your actual store URL and password
const STORE_URL = "https://thapas-technical.myshopify.com";
const STORE_PASSWORD = "ss";

async function unlockStore(page) {
  await page.goto(`${STORE_URL}`);
  await page.fill('input[name="password"]', STORE_PASSWORD);
  await page.click('button[type="submit"]');
//   await page.waitForLoadState("networkidle");
  console.log("✅ Store unlocked successfully!");
}

test.describe("Shopify Visual Regression Tests", () => {
  
  test("Cart Page snapshot", async ({ page }) => {
    await unlockStore(page);
    await page.goto(`${STORE_URL}/cart`, { waitUntil: "networkidle" });

    await expect(page.locator("body")).toBeVisible();

    await percySnapshot(page, "Cart Page");
    console.log("📸 Percy snapshot taken for Cart Page");
  });
});
