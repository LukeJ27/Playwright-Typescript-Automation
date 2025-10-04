import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login', () => {
  test('should login with valid credentials', async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();
    await login.login('tomsmith', 'SuperSecretPassword!');
    expect(await login.getFlashMessage()).toContain('You logged into a secure area!');
  });
  test('should fail with invalid username', async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();
    await login.login('invalid', 'SuperSecretPassword!');
    expect(await login.getFlashMessage()).toContain('Your username is invalid!');
  });
  test('should fail with invalid password', async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();
    await login.login('tomsmith', 'wrongpassword');
    expect(await login.getFlashMessage()).toContain('Your password is invalid!');
  });
  test('should fail with empty credentials', async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();
    await login.login('', '');
    expect(await login.getFlashMessage()).toContain('Your username is invalid!');
  });
});
