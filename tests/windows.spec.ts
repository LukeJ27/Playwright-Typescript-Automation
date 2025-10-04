import { test, expect } from '@playwright/test';
import { WindowsPage } from '../pages/WindowsPage';

test.describe('Windows', () => {
  test('should open new window', async ({ page, context }) => {
    const windows = new WindowsPage(page);
    await windows.open();
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      windows.clickHere()
    ]);
    expect(newPage.url()).toContain('/windows/new');
  });
  test('should handle missing link gracefully', async ({ page, context }) => {
    const windows = new WindowsPage(page);
    await windows.open();
    await page.evaluate(() => document.querySelector('a[href="/windows/new"]')?.remove());
    await expect(async () => { await windows.clickHere(); }).rejects.toThrow();
  });
  test('should not open new window if not clicked', async ({ page, context }) => {
    const windows = new WindowsPage(page);
    await windows.open();
    let newPageOpened = false;
    context.once('page', () => { newPageOpened = true; });
    // Do not click
    expect(newPageOpened).toBe(false);
  });
});
