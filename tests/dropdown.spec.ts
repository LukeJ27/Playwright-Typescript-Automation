import { test, expect } from '@playwright/test';
import { DropdownPage } from '../pages/DropdownPage';

test.describe('Dropdown', () => {
  test('should select valid option', async ({ page }) => {
    const dropdown = new DropdownPage(page);
    await dropdown.open();
    await dropdown.selectOption('2');
    expect(await dropdown.getSelectedOption()).toBe('2');
  });
});
