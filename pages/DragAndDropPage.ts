import { Page } from '@playwright/test';
export class DragAndDropPage {
  readonly page: Page;
  readonly columnA = '#column-a';
  readonly columnB = '#column-b';
  constructor(page: Page) { this.page = page; }
  async open() { await this.page.goto('https://the-internet.herokuapp.com/drag_and_drop'); }
  async dragAtoB() { await this.page.dragAndDrop(this.columnA, this.columnB); }
  async getColumnAText() { return this.page.textContent(this.columnA); }
  async getColumnBText() { return this.page.textContent(this.columnB); }
}
