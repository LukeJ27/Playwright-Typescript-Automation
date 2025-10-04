import { test, expect } from '@playwright/test';
import { JavaScriptAlertsPage } from '../pages/JavaScriptAlertsPage';

test.describe('JavaScript Alerts', () => {
  test('should accept JS alert', async ({ page }) => {
    const alerts = new JavaScriptAlertsPage(page);
    await alerts.open();
    page.once('dialog', dialog => dialog.accept());
    await alerts.clickJsAlert();
    expect(await alerts.getResultText()).toContain('You successfully clicked an alert');
  });
  test('should dismiss JS confirm', async ({ page }) => {
    const alerts = new JavaScriptAlertsPage(page);
    await alerts.open();
    page.once('dialog', dialog => dialog.dismiss());
    await alerts.clickJsConfirm();
    expect(await alerts.getResultText()).toContain('You clicked: Cancel');
  });
  test('should accept JS confirm', async ({ page }) => {
    const alerts = new JavaScriptAlertsPage(page);
    await alerts.open();
    page.once('dialog', dialog => dialog.accept());
    await alerts.clickJsConfirm();
    expect(await alerts.getResultText()).toContain('You clicked: Ok');
  });
  test('should enter text in JS prompt', async ({ page }) => {
    const alerts = new JavaScriptAlertsPage(page);
    await alerts.open();
    page.once('dialog', dialog => dialog.accept('Playwright'));
    await alerts.clickJsPrompt();
    expect(await alerts.getResultText()).toContain('You entered: Playwright');
  });
  test('should dismiss JS prompt', async ({ page }) => {
    const alerts = new JavaScriptAlertsPage(page);
    await alerts.open();
    page.once('dialog', dialog => dialog.dismiss());
    await alerts.clickJsPrompt();
    expect(await alerts.getResultText()).toContain('You entered: null');
  });
});
