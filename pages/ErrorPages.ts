import { Page } from '@playwright/test';
export class ErrorPages {
  readonly page: Page;
  readonly brokenImagesUrl = 'https://the-internet.herokuapp.com/broken_images';
  readonly statusCodesUrl = 'https://the-internet.herokuapp.com/status_codes';
  readonly typosUrl = 'https://the-internet.herokuapp.com/typos';
  constructor(page: Page) { this.page = page; }
  async openBrokenImages() { await this.page.goto(this.brokenImagesUrl); }
  async openStatusCodes() { await this.page.goto(this.statusCodesUrl); }
  async openTypos() { await this.page.goto(this.typosUrl); }
}
