import { Page } from '@playwright/test';
export class TablesPage {
  readonly page: Page;
  readonly table1 = '#table1';
  readonly table2 = '#table2';
  constructor(page: Page) { this.page = page; }
  async open() { await this.page.goto('https://the-internet.herokuapp.com/tables'); }
  async getTable1Rows() { return this.page.$$(`${this.table1} tbody tr`); }
  async getTable2Rows() { return this.page.$$(`${this.table2} tbody tr`); }
  async getCellText(table: 'table1' | 'table2', row: number, col: number) { const tableSelector = table === 'table1' ? this.table1 : this.table2; return this.page.textContent(`${tableSelector} tbody tr:nth-child(${row}) td:nth-child(${col})`); }
}
