import { test, expect } from '@playwright/test';

test.describe('Checkboxes', () => {
  test('should handle missing checkbox gracefully', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/checkboxes');
    // Simulate missing checkbox by removing one via JS
    await page.evaluate(() => {
      const cb = document.querySelector('input[type="checkbox"]');
      if (cb) cb.remove();
    });
    const checkboxes = await page.$$('input[type="checkbox"]');
    // Should be 1 left, and no crash
    expect(checkboxes.length).toBe(1);
    // Optionally check for fallback or error message
  });
});
