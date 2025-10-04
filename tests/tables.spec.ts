import { test, expect } from '@playwright/test';
import { TablesPage } from '../pages/TablesPage';

test.describe('Tables', () => {
  test('should read table data', async ({ page }) => {
    const tables = new TablesPage(page);
    await tables.open();
    const rows = await tables.getTable1Rows();
    expect(rows.length).toBeGreaterThan(0);
    expect(await tables.getCellText('table1', 1, 1)).toBeTruthy();
  });
  test('should handle missing table gracefully', async ({ page }) => {
    const tables = new TablesPage(page);
    await tables.open();
    await page.evaluate(() => document.getElementById('table1')?.remove());
    const rows = await tables.page.$$('#table1 tbody tr');
    expect(rows.length).toBe(0);
  });
  test('should handle out-of-bounds cell access', async ({ page }) => {
    const tables = new TablesPage(page);
    await tables.open();
    const cell = await tables.page.$('#table1 tbody tr:nth-child(100) td:nth-child(100)');
    expect(cell).toBeNull();
  });
});
