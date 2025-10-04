import { Page } from '@playwright/test';
export class DynamicContentPage {
  readonly page: Page;
  readonly dynamicContentUrl = 'https://the-internet.herokuapp.com/dynamic_content';
  readonly dynamicControlsUrl = 'https://the-internet.herokuapp.com/dynamic_controls';
  readonly dynamicLoadingUrl = 'https://the-internet.herokuapp.com/dynamic_loading';
  constructor(page: Page) { this.page = page; }
  async openDynamicContent() { await this.page.goto(this.dynamicContentUrl); }
  async openDynamicControls() { await this.page.goto(this.dynamicControlsUrl); }
  async openDynamicLoading() { await this.page.goto(this.dynamicLoadingUrl); }
}
