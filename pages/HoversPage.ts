import { Page } from '@playwright/test';
export class HoversPage {
  readonly page: Page;
  readonly avatars = '.figure';
  readonly caption = '.figcaption';
  constructor(page: Page) { this.page = page; }
  async open() { await this.page.goto('https://the-internet.herokuapp.com/hovers'); }
  async hoverAvatar(index: number) { const avatar = await this.page.$$(this.avatars); await avatar[index].hover(); }
  async getCaptionText(index: number) { const captions = await this.page.$$(this.caption); return captions[index].textContent(); }
}
