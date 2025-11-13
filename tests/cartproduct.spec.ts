import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://thapas-technical.myshopify.com/password');
  await page.getByRole('textbox', { name: 'Enter store password' }).click();
  await page.getByRole('textbox', { name: 'Enter store password' }).fill('ss');
  await page.getByRole('button', { name: 'Enter' }).click();
  await page.getByRole('button', { name: 'Catalog' }).click();
  await page.getByRole('link', { name: 'Apperals' }).click();
  await page.getByRole('link', { name: 'black T-shirt Sale' }).click();
  await page.getByRole('button', { name: 'Add to cart' }).click();
  await expect(page.getByLabel('Your cart').getByRole('link', { name: 'black T-shirt' })).toBeVisible();
});