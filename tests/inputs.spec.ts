import { test, expect } from '@playwright/test';
import { InputsPage } from '../pages/InputsPage';

test.describe('Inputs', () => {
  test('should enter a valid number', async ({ page }) => {
    const inputs = new InputsPage(page);
    await inputs.open();
    await inputs.setValue('42');
    expect(await inputs.getValue()).toBe('42');
  });
  test('should not accept non-numeric input', async ({ page }) => {
    const inputs = new InputsPage(page);
    await inputs.open();
    const input = await page.$('input[type="number"]');
    expect(input).not.toBeNull();
    if (input) {
      let errorCaught = false;
      try {
        await input.type('abc');
      } catch (e) {
        errorCaught = true;
      }
      // The input will remain empty or unchanged
      const value = await input.inputValue();
      expect(value === '' || isNaN(Number(value))).toBe(true);
      expect(value).toBe('');
      expect(errorCaught).toBe(false); // Should not throw, just not accept
    }
  });
  test('should accept empty input', async ({ page }) => {
    const inputs = new InputsPage(page);
    await inputs.open();
    await inputs.setValue('');
    expect(await inputs.getValue()).toBe('');
  });
  test('should accept negative numbers', async ({ page }) => {
    const inputs = new InputsPage(page);
    await inputs.open();
    await inputs.setValue('-10');
    expect(await inputs.getValue()).toBe('-10');
  });
});
