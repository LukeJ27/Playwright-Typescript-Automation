// ...existing code...
import { test, expect } from '@playwright/test';
import { CheckboxesPage } from '../pages/CheckboxesPage';

test.describe('Checkboxes', () => {
  test('should check and uncheck both checkboxes', async ({ page }) => {
    const checkboxes = new CheckboxesPage(page);
    await checkboxes.open();
    await checkboxes.checkFirst();
    expect(await checkboxes.isFirstChecked()).toBe(true);
    await checkboxes.uncheckFirst();
    expect(await checkboxes.isFirstChecked()).toBe(false);
    await checkboxes.checkSecond();
    expect(await checkboxes.isSecondChecked()).toBe(true);
    await checkboxes.uncheckSecond();
    expect(await checkboxes.isSecondChecked()).toBe(false);
  });
  test('should not throw when checking already checked', async ({ page }) => {
    const checkboxes = new CheckboxesPage(page);
    await checkboxes.open();
    await checkboxes.checkFirst();
    await checkboxes.checkFirst();
    expect(await checkboxes.isFirstChecked()).toBe(true);
  });
  test('should not throw when unchecking already unchecked', async ({ page }) => {
    const checkboxes = new CheckboxesPage(page);
    await checkboxes.open();
    await checkboxes.uncheckFirst();
    await checkboxes.uncheckFirst();
    expect(await checkboxes.isFirstChecked()).toBe(false);
  });
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
// ...existing code...
