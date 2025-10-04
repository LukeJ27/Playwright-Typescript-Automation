import { test, expect } from '@playwright/test';
import { UIControlsPage } from '../pages/UIControlsPage';

test.describe('Checkboxes', () => {
  test('should check and uncheck both checkboxes', async ({ page }) => {
    const ui = new UIControlsPage(page);
    await ui.openCheckboxes();
    await ui.checkFirst();
    expect(await page.isChecked(ui.checkbox1)).toBe(true);
    await ui.uncheckFirst();
    expect(await page.isChecked(ui.checkbox1)).toBe(false);
    await ui.checkSecond();
    expect(await page.isChecked(ui.checkbox2)).toBe(true);
    await ui.uncheckSecond();
    expect(await page.isChecked(ui.checkbox2)).toBe(false);
  });
  test('should not throw when checking already checked', async ({ page }) => {
    const ui = new UIControlsPage(page);
    await ui.openCheckboxes();
    await ui.checkFirst();
    await ui.checkFirst();
    expect(await page.isChecked(ui.checkbox1)).toBe(true);
  });
  test('should not throw when unchecking already unchecked', async ({ page }) => {
    const ui = new UIControlsPage(page);
    await ui.openCheckboxes();
    await ui.uncheckFirst();
    await ui.uncheckFirst();
    expect(await page.isChecked(ui.checkbox1)).toBe(false);
  });
});

test.describe('Dropdown', () => {
  test('should select valid option', async ({ page }) => {
    const ui = new UIControlsPage(page);
    await ui.openDropdown();
    await ui.selectDropdown('2');
    expect(await page.$eval(ui.dropdown, el => (el as HTMLSelectElement).value)).toBe('2');
  });
  test('should select default option', async ({ page }) => {
    const ui = new UIControlsPage(page);
    await ui.openDropdown();
    expect(await page.$eval(ui.dropdown, el => (el as HTMLSelectElement).value)).toBe('');
  });
});

test.describe('Slider', () => {
  test('should set valid value', async ({ page }) => {
    const ui = new UIControlsPage(page);
    await ui.openSlider();
    await ui.setSlider('3');
    expect(await page.inputValue(ui.slider)).toBe('3');
  });
  test('should set min and max values', async ({ page }) => {
    const ui = new UIControlsPage(page);
    await ui.openSlider();
    await ui.setSlider('0');
    expect(await page.inputValue(ui.slider)).toBe('0');
    await ui.setSlider('5');
    expect(await page.inputValue(ui.slider)).toBe('5');
  });
});
