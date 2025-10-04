import { Page } from '@playwright/test';
export class WindowsPage {
  readonly page: Page;
  readonly clickHereLink = 'a[href="/windows/new"]';
  constructor(page: Page) { this.page = page; }
  async open() { await this.page.goto('https://the-internet.herokuapp.com/windows'); }
  async clickHere() { await this.page.click(this.clickHereLink); }
}
