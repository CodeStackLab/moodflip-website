# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: moodflip.spec.ts >> MoodFlip E2E Visible Browser Test
- Location: tests\moodflip.spec.ts:3:5

# Error details

```
Error: page.goto: net::ERR_NETWORK_ACCESS_DENIED at https://moodflip-website.vercel.app/
Call log:
  - navigating to "https://moodflip-website.vercel.app/", waiting until "load"

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e6]:
    - heading "Your Internet access is blocked" [level=1] [ref=e7]
    - paragraph [ref=e8]: Firewall or antivirus software may have blocked the connection.
    - generic [ref=e9]:
      - paragraph [ref=e10]: "Try:"
      - list [ref=e11]:
        - listitem [ref=e12]: Checking the connection
        - listitem [ref=e13]:
          - link "Checking firewall and antivirus configurations" [ref=e14] [cursor=pointer]:
            - /url: "#buttons"
        - listitem [ref=e15]:
          - link "Running Windows Network Diagnostics" [ref=e16] [cursor=pointer]:
            - /url: javascript:diagnoseErrors()
    - generic [ref=e17]: ERR_NETWORK_ACCESS_DENIED
  - button "Details" [ref=e19] [cursor=pointer]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('MoodFlip E2E Visible Browser Test', async ({ page }) => {
  4  |   console.log('Navigating to live MoodFlip website...');
> 5  |   await page.goto('https://moodflip-website.vercel.app');
     |              ^ Error: page.goto: net::ERR_NETWORK_ACCESS_DENIED at https://moodflip-website.vercel.app/
  6  | 
  7  |   // Verify Hero Title
  8  |   await expect(page.locator('h1')).toBeVisible();
  9  | 
  10 |   // Test Step 1: Click SAD
  11 |   await page.click('button:has-text("SAD")');
  12 |   await page.waitForTimeout(500);
  13 | 
  14 |   // Test Step 2: Click Lonely
  15 |   await page.click('text=Lonely');
  16 |   await page.waitForTimeout(500);
  17 | 
  18 |   // Test Step 3: Click Isolated
  19 |   await page.click('text=Isolated');
  20 |   await page.waitForTimeout(500);
  21 | 
  22 |   // Test Step 4: Click Flip My Mood with force: true for animated pulsing button
  23 |   await page.click('button:has-text("Flip My Mood")', { force: true });
  24 |   await page.waitForTimeout(1000);
  25 | 
  26 |   // Verify Sunburst Result Card
  27 |   await expect(page.locator('text=Your Positive Target Mood Is:')).toBeVisible();
  28 |   console.log('SUCCESS: E2E Playwright test passed!');
  29 | });
  30 | 
```