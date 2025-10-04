import { test, expect } from '@playwright/test';
import { DragAndDropPage } from '../pages/DragAndDropPage';

test.describe('Drag and Drop', () => {
  test('should drag column A to column B', async ({ page }) => {
    const dragDrop = new DragAndDropPage(page);
    await dragDrop.open();
    await dragDrop.dragAtoB();
    expect(await dragDrop.getColumnAText()).toContain('B');
  });
  test('should not drag if target is missing', async ({ page }) => {
    const dragDrop = new DragAndDropPage(page);
    await dragDrop.open();
    await page.evaluate(() => document.getElementById('column-b')?.remove());
    await expect(async () => { await dragDrop.dragAtoB(); }).rejects.toThrow();
  });
  test('should not drag if source is missing', async ({ page }) => {
    const dragDrop = new DragAndDropPage(page);
    await dragDrop.open();
    await page.evaluate(() => document.getElementById('column-a')?.remove());
    await expect(async () => { await dragDrop.dragAtoB(); }).rejects.toThrow();
  });
});
