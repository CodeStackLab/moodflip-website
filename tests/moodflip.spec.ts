import { test, expect } from '@playwright/test';

test('MoodFlip E2E Visible Browser Test', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });

  await expect(page.getByRole('heading', { name: /shift your mindset/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /login/i })).toBeVisible();

  await page.getByRole('button', { name: /^sad$/i }).click();

  await page.getByRole('button', { name: /lonely/i }).click();

  await page.locator('#demo').getByRole('button', { name: /flip my mood/i }).click();

  await expect(page.getByText('Connected')).toBeVisible();
  await expect(page.getByText(/Send one short message/i)).toBeVisible();
});
