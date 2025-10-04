import { Page } from '@playwright/test';
export class UIControlsPage {
  readonly page: Page;
  readonly checkboxesUrl = 'https://the-internet.herokuapp.com/checkboxes';
  readonly dropdownUrl = 'https://the-internet.herokuapp.com/dropdown';
  readonly sliderUrl = 'https://the-internet.herokuapp.com/horizontal_slider';
  readonly checkbox1 = 'form#checkboxes input[type="checkbox"]:nth-of-type(1)';
  readonly checkbox2 = 'form#checkboxes input[type="checkbox"]:nth-of-type(2)';
  readonly dropdown = '#dropdown';
  readonly slider = 'input[type="range"]';
  constructor(page: Page) { this.page = page; }
  async openCheckboxes() { await this.page.goto(this.checkboxesUrl); }
  async openDropdown() { await this.page.goto(this.dropdownUrl); }
  async openSlider() { await this.page.goto(this.sliderUrl); }
  async checkFirst() { await this.page.check(this.checkbox1); }
  async uncheckFirst() { await this.page.uncheck(this.checkbox1); }
  async checkSecond() { await this.page.check(this.checkbox2); }
  async uncheckSecond() { await this.page.uncheck(this.checkbox2); }
  async selectDropdown(value: string) { await this.page.selectOption(this.dropdown, value); }
  async setSlider(value: string) { await this.page.fill(this.slider, value); }
}
