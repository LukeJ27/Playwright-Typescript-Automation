import { test, expect } from '@playwright/test';
import { AuthPages } from '../pages/AuthPages';

test.describe('Basic Auth', () => {
  test('should login with correct credentials', async ({ browser }) => {
    const context = await browser.newContext({
      httpCredentials: {
        username: 'admin',
        password: 'admin'
      }
    });
    const page = await context.newPage();
    await page.goto('https://the-internet.herokuapp.com/basic_auth');
    expect(await page.textContent('body')).toContain('Congratulations');
    await context.close();
  });
  // ...existing code...
});

// Digest Auth tests removed: Playwright cannot automate Digest Auth dialogs

test.describe('Form Authentication', () => {
  test('should login with valid credentials', async ({ page }) => {
    const auth = new AuthPages(page);
    await auth.openLogin();
    await auth.login('tomsmith', 'SuperSecretPassword!');
    expect(await auth.getFlashMessage()).toContain('You logged into a secure area!');
  });
  test('should fail with invalid username', async ({ page }) => {
    const auth = new AuthPages(page);
    await auth.openLogin();
    await auth.login('invalid', 'SuperSecretPassword!');
    expect(await auth.getFlashMessage()).toContain('Your username is invalid!');
  });
  test('should fail with invalid password', async ({ page }) => {
    const auth = new AuthPages(page);
    await auth.openLogin();
    await auth.login('tomsmith', 'wrongpassword');
    expect(await auth.getFlashMessage()).toContain('Your password is invalid!');
  });
  test('should fail with empty credentials', async ({ page }) => {
    const auth = new AuthPages(page);
    await auth.openLogin();
    await auth.login('', '');
    expect(await auth.getFlashMessage()).toContain('Your username is invalid!');
  });
});
