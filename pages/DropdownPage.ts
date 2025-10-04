import { Page } from '@playwright/test';
export class DropdownPage {
  readonly page: Page;
  readonly dropdown = '#dropdown';
  constructor(page: Page) { this.page = page; }
  async open() { await this.page.goto('https://the-internet.herokuapp.com/dropdown'); }
  async selectOption(value: string) { await this.page.selectOption(this.dropdown, value); }
  async getSelectedOption() { return this.page.$eval(this.dropdown, el => (el as HTMLSelectElement).value); }
}
