import { Page } from '@playwright/test';
export class AdvancedUIPage {
  readonly page: Page;
  readonly dragDropUrl = 'https://the-internet.herokuapp.com/drag_and_drop';
  readonly hoversUrl = 'https://the-internet.herokuapp.com/hovers';
  readonly contextMenuUrl = 'https://the-internet.herokuapp.com/context_menu';
  readonly dragA = '#column-a';
  readonly dragB = '#column-b';
  readonly avatar = '.figure';
  readonly contextArea = '#hot-spot';
  constructor(page: Page) { this.page = page; }
  async openDragDrop() { await this.page.goto(this.dragDropUrl); }
  async openHovers() { await this.page.goto(this.hoversUrl); }
  async openContextMenu() { await this.page.goto(this.contextMenuUrl); }
  async dragAtoB() { await this.page.dragAndDrop(this.dragA, this.dragB); }
  async hoverAvatar(index: number) { const avatars = await this.page.$$(this.avatar); await avatars[index].hover(); }
  async rightClickContextArea() { await this.page.click(this.contextArea, { button: 'right' }); }
}
