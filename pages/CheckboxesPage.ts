import { Page } from '@playwright/test';
export class CheckboxesPage {
  readonly page: Page;
  readonly checkbox1 = 'form#checkboxes input[type="checkbox"]:nth-of-type(1)';
  readonly checkbox2 = 'form#checkboxes input[type="checkbox"]:nth-of-type(2)';
  constructor(page: Page) { this.page = page; }
  async open() { await this.page.goto('https://the-internet.herokuapp.com/checkboxes'); }
  async checkFirst() { await this.page.check(this.checkbox1); }
  async uncheckFirst() { await this.page.uncheck(this.checkbox1); }
  async checkSecond() { await this.page.check(this.checkbox2); }
  async uncheckSecond() { await this.page.uncheck(this.checkbox2); }
  async isFirstChecked() { return this.page.isChecked(this.checkbox1); }
  async isSecondChecked() { return this.page.isChecked(this.checkbox2); }
}
