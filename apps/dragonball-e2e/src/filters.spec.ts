import { test, expect } from '@playwright/test';

test.describe('Dragon Ball Filters', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dragonball');
    // Wait for loading to finish
    await page
      .locator('[data-testid="product-list-loading"]')
      .first()
      .waitFor({ state: 'detached', timeout: 30000 });
  });

  test('should filter by name', async ({ page }) => {
    const searchInput = page.getByTestId('filter-name-input');
    await searchInput.fill('Goku');

    // Wait for debounce and reload
    await page.waitForResponse(resp => resp.url().includes('characters') && resp.status() === 200);

    const cards = page.locator('[data-testid="product-card"]');
    await expect(cards.first()).toContainText('Goku');
  });

  test('should filter by race', async ({ page }) => {
    const saiyanRadio = page.getByTestId('filter-race-radio-option-Saiyan');
    await saiyanRadio.click();

    // Wait for reload
    await page.waitForResponse(resp => resp.url().includes('characters') && resp.status() === 200);

    const firstCard = page.locator('[data-testid="product-card"]').first();
    await firstCard.click();

    await expect(page.locator('body')).toContainText('Saiyan');
  });
});
