import { Page } from '@playwright/test';
export class InputsPage {
  readonly page: Page;
  readonly numberInput = 'input[type="number"]';
  constructor(page: Page) { this.page = page; }
  async open() { await this.page.goto('https://the-internet.herokuapp.com/inputs'); }
  async setValue(value: string) { await this.page.fill(this.numberInput, value); }
  async getValue() { return this.page.inputValue(this.numberInput); }
}
