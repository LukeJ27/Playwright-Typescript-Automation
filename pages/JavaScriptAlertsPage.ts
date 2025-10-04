import { Page } from '@playwright/test';
export class JavaScriptAlertsPage {
  readonly page: Page;
  readonly jsAlertButton = 'button:has-text("Click for JS Alert")';
  readonly jsConfirmButton = 'button:has-text("Click for JS Confirm")';
  readonly jsPromptButton = 'button:has-text("Click for JS Prompt")';
  readonly resultText = '#result';
  constructor(page: Page) { this.page = page; }
  async open() { await this.page.goto('https://the-internet.herokuapp.com/javascript_alerts'); }
  async clickJsAlert() { await this.page.click(this.jsAlertButton); }
  async clickJsConfirm() { await this.page.click(this.jsConfirmButton); }
  async clickJsPrompt() { await this.page.click(this.jsPromptButton); }
  async getResultText() { return this.page.textContent(this.resultText); }
}
