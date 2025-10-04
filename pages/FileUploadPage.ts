import { Page } from '@playwright/test';
export class FileUploadPage {
  readonly page: Page;
  readonly uploadInput = 'input[type="file"]';
  readonly uploadButton = 'input[type="submit"]';
  readonly uploadedFiles = '#uploaded-files';
  constructor(page: Page) { this.page = page; }
  async open() { await this.page.goto('https://the-internet.herokuapp.com/upload'); }
  async uploadFile(filePath: string) { await this.page.setInputFiles(this.uploadInput, filePath); await this.page.click(this.uploadButton); }
  async getUploadedFileName() { return this.page.textContent(this.uploadedFiles); }
}
