import { test, expect } from '@playwright/test';

test('MoodFlip E2E Visible Browser Test', async ({ page }) => {
  console.log('Navigating to live MoodFlip website...');
  await page.goto('https://moodflip-website.vercel.app');

  // Verify Hero Title
  await expect(page.locator('h1')).toBeVisible();

  // Test Step 1: Click SAD
  await page.click('button:has-text("SAD")');
  await page.waitForTimeout(500);

  // Test Step 2: Click Lonely
  await page.click('text=Lonely');
  await page.waitForTimeout(500);

  // Test Step 3: Click Isolated
  await page.click('text=Isolated');
  await page.waitForTimeout(500);

  // Test Step 4: Click Flip My Mood with force: true for animated pulsing button
  await page.click('button:has-text("Flip My Mood")', { force: true });
  await page.waitForTimeout(1000);

  // Verify Sunburst Result Card
  await expect(page.locator('text=Your Positive Target Mood Is:')).toBeVisible();
  console.log('SUCCESS: E2E Playwright test passed!');
});
