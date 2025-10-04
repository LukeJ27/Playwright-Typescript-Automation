import { test, expect } from '@playwright/test';
import { AdvancedUIPage } from '../pages/AdvancedUIPage';

test.describe('Drag and Drop', () => {
  test('should drag column A to column B', async ({ page }) => {
    const adv = new AdvancedUIPage(page);
    await adv.openDragDrop();
    await adv.dragAtoB();
    expect(await page.textContent(adv.dragA)).toContain('B');
  });
  test('should not drag if target is missing', async ({ page }) => {
    const adv = new AdvancedUIPage(page);
    await adv.openDragDrop();
    // Remove column B and try drag
    await page.evaluate(() => document.getElementById('column-b')?.remove());
    await expect(async () => { await adv.dragAtoB(); }).rejects.toThrow();
  });
});

test.describe('Hovers', () => {
  test('should show caption on hover', async ({ page }) => {
    const adv = new AdvancedUIPage(page);
    await adv.openHovers();
    await adv.hoverAvatar(0);
    expect(await page.textContent('.figcaption')).toBeTruthy();
  });
  test('should not show caption if not hovered', async ({ page }) => {
    const adv = new AdvancedUIPage(page);
    await adv.openHovers();
    expect(await page.isVisible('.figcaption')).toBe(false);
  });
});

test.describe('Context Menu', () => {
  test('should show context menu on right click', async ({ page }) => {
    const adv = new AdvancedUIPage(page);
    await adv.openContextMenu();
    await adv.rightClickContextArea();
    // The alert should appear
    page.once('dialog', dialog => {
      expect(dialog.message()).toContain('You selected a context menu');
      dialog.accept();
    });
  });
  test('should not show context menu on left click', async ({ page }) => {
    const adv = new AdvancedUIPage(page);
    await adv.openContextMenu();
    await page.click(adv.contextArea, { button: 'left' });
    // No dialog should appear
    let dialogShown = false;
    page.once('dialog', () => { dialogShown = true; });
    expect(dialogShown).toBe(false);
  });
});
