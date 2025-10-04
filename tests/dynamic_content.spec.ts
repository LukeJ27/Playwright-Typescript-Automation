import { test, expect } from '@playwright/test';
import { DynamicContentPage } from '../pages/DynamicContentPage';

test.describe('Dynamic Content', () => {
  test('should load new content on refresh', async ({ page }) => {
    const dynamic = new DynamicContentPage(page);
    await dynamic.openDynamicContent();
    const firstContent = await page.textContent('#content');
    await page.reload();
    const secondContent = await page.textContent('#content');
    expect(firstContent).not.toBe(secondContent);
  });
  test('should show content even if not refreshed', async ({ page }) => {
    const dynamic = new DynamicContentPage(page);
    await dynamic.openDynamicContent();
    expect(await page.textContent('#content')).toBeTruthy();
  });
});

test.describe('Dynamic Controls', () => {
  // ...existing code...
  test('should enable and disable input', async ({ page }) => {
    const dynamic = new DynamicContentPage(page);
    await dynamic.openDynamicControls();
    await page.click('button:has-text("Enable")');
    await expect(page.locator('input[type="text"]')).toBeEnabled();
    await page.click('button:has-text("Disable")');
    await expect(page.locator('input[type="text"]')).toBeDisabled();
  });
});

test.describe('Dynamic Loading', () => {
  test('should finish loading after start (Example 1)', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/1');
    await page.click('button');
    await expect(page.locator('#finish')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('#finish')).toContainText('Hello World!');
  });
  test('should finish loading after start (Example 2)', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/2');
    await page.click('button');
    await expect(page.locator('#finish')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('#finish')).toContainText('Hello World!');
  });
  test('should not show finish before loading (Example 1)', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/1');
    await expect(page.locator('#finish')).not.toBeVisible();
  });
  test('should not show finish before loading (Example 2)', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/2');
    await expect(page.locator('#finish')).not.toBeVisible();
  });
});
