import { test, expect } from '@playwright/test';

test('MoodFlip E2E Visible Browser Test', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });

  await expect(page.getByRole('heading', { name: /a quiet breath/i })).toBeVisible();

  await page.getByRole('button', { name: /sad/i }).click({ force: true });

  await page.getByRole('button', { name: /lonely/i }).click();

  await page.getByRole('button', { name: /isolated/i }).click();

  await page.getByRole('button', { name: /reveal my mindset shift/i }).click();

  await expect(page.getByText('Connected').first()).toBeVisible();
  await expect(page.getByText(/Send one voice note/i)).toBeVisible();
});
