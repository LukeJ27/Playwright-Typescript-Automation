import { test, expect } from '@playwright/test';
import { FramesPage } from '../pages/FramesPage';

test.describe('Frames', () => {
  test('should open nested frames and iframe', async ({ page }) => {
    const framesPage = new FramesPage(page);
    await framesPage.open();
    // Nested Frames
    await page.goto('https://the-internet.herokuapp.com/nested_frames');
    // Check for server error
    if (await page.isVisible('text=Internal Server Error')) {
      // Fail gracefully and log error
      expect(await page.isVisible('text=Internal Server Error')).toBe(false);
      return;
    }
    // Proceed with frame navigation if no error
    const allFrames = page.frames();
    expect(allFrames.length).toBeGreaterThan(1);
    await expect(page).toHaveURL(/.*nested_frames/);
    // iFrame
    await framesPage.open();
    await framesPage.openIFrame();
    await expect(page).toHaveURL(/.*iframe/);
  // Wait for iframe to appear and check presence
  await page.waitForSelector('iframe', { timeout: 5000 });
  const iframe = await page.$('iframe');
  expect(iframe).not.toBeNull();
  });
  test('should fail to open iframe if link missing', async ({ page }) => {
    const frames = new FramesPage(page);
    await frames.open();
    await page.evaluate(() => document.querySelector('a[href="/iframe"]')?.remove());
    await expect(async () => { await frames.openIFrame(); }).rejects.toThrow();
  });
  test('should fail to open nested frames if link missing', async ({ page }) => {
    const frames = new FramesPage(page);
    await frames.open();
    await page.evaluate(() => document.querySelector('a[href="/nested_frames"]')?.remove());
    await expect(async () => { await frames.openNestedFrames(); }).rejects.toThrow();
  });
});
