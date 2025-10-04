import { Page } from '@playwright/test';
export class AuthPages {
  readonly page: Page;
  readonly basicAuthUrl = 'https://the-internet.herokuapp.com/basic_auth';
  readonly digestAuthUrl = 'https://the-internet.herokuapp.com/digest_auth';
  readonly loginUrl = 'https://the-internet.herokuapp.com/login';
  readonly usernameInput = '#username';
  readonly passwordInput = '#password';
  readonly loginButton = 'button[type="submit"]';
  readonly flashMessage = '#flash';
  constructor(page: Page) { this.page = page; }
  async openBasicAuth() { await this.page.goto(this.basicAuthUrl); }
  async openDigestAuth() { await this.page.goto(this.digestAuthUrl); }
  async openLogin() { await this.page.goto(this.loginUrl); }
  async login(username: string, password: string) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }
  async getFlashMessage() { return this.page.textContent(this.flashMessage); }
}
