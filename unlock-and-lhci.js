import { chromium } from 'playwright';
import { execSync } from 'child_process';

const STORE_URL = 'https://thapas-technical.myshopify.com/';
const STORE_PASSWORD = 'ss'; // replace with your real password

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Unlock password-protected store
  await page.goto(`${STORE_URL}`);
  await page.fill('input[name="password"]', STORE_PASSWORD);
  await page.click('button[type="submit"]');
  await page.waitForLoadState('networkidle');
  console.log('✅ Store unlocked successfully');

  // Run Lighthouse CI once unlocked
  console.log('🚀 Running Lighthouse CI...');
  execSync('npx lhci autorun', { stdio: 'inherit' });

  await browser.close();
})();
