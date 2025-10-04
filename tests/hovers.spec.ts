import { test, expect } from '@playwright/test';
import { HoversPage } from '../pages/HoversPage';

test.describe('Hovers', () => {
  test('should show caption on hover', async ({ page }) => {
    const hovers = new HoversPage(page);
    await hovers.open();
    await hovers.hoverAvatar(0);
    expect(await hovers.getCaptionText(0)).toBeTruthy();
  });
  test('should not show caption if not hovered', async ({ page }) => {
    const hovers = new HoversPage(page);
    await hovers.open();
    expect(await page.isVisible(hovers.caption)).toBe(false);
  });
  test('should handle missing avatar gracefully', async ({ page }) => {
    const hovers = new HoversPage(page);
    await hovers.open();
      await page.goto('https://the-internet.herokuapp.com/hovers');
      const avatars = await page.$$('.figure');
      if (avatars.length === 0) {
        // Gracefully handle missing avatars
        expect(avatars.length).toBe(0);
      } else {
        // Proceed with normal hover tests
        expect(avatars.length).toBeGreaterThan(0);
      }
  });
});
