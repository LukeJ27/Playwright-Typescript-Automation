import { Page } from '@playwright/test';
export class FramesPage {
  readonly page: Page;
  readonly nestedFramesLink = 'a[href="/nested_frames"]';
  readonly iFrameLink = 'a[href="/iframe"]';
  constructor(page: Page) { this.page = page; }
  async open() { await this.page.goto('https://the-internet.herokuapp.com/frames'); }
  async openNestedFrames() { await this.page.click(this.nestedFramesLink); }
  async openIFrame() { await this.page.click(this.iFrameLink); }
}
