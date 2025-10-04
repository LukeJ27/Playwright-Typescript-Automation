import { Page } from '@playwright/test';
export class LoginPage {
  readonly page: Page;
  readonly usernameInput = '#username';
  readonly passwordInput = '#password';
  readonly loginButton = 'button[type="submit"]';
  readonly flashMessage = '#flash';
  constructor(page: Page) { this.page = page; }
  async open() { await this.page.goto('https://the-internet.herokuapp.com/login'); }
  async login(username: string, password: string) { await this.page.fill(this.usernameInput, username); await this.page.fill(this.passwordInput, password); await this.page.click(this.loginButton); }
  async getFlashMessage() { return this.page.textContent(this.flashMessage); }
}
