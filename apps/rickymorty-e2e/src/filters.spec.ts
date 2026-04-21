import { test, expect } from '@playwright/test';

test.describe('Rick & Morty Filters', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/rickymorty');
    // Wait for loading to finish
    await page
      .locator('[data-testid="product-list-loading"]')
      .first()
      .waitFor({ state: 'detached', timeout: 30000 });
  });

  test('should filter by name', async ({ page }) => {
    const searchInput = page.getByTestId('filter-name-input');
    await searchInput.fill('Morty Smith');

    // Wait for debounce and reload
    await page.waitForResponse(resp => resp.url().includes('character') && resp.status() === 200);

    const cards = page.locator('[data-testid="product-card"]');
    await expect(cards.first()).toContainText('Morty Smith');
  });

  test('should filter by status', async ({ page }) => {
    const aliveRadio = page.getByTestId('filter-status-radio-option-alive');
    await aliveRadio.click();

    // Wait for reload
    await page.waitForResponse(resp => resp.url().includes('character') && resp.status() === 200);

    const firstCard = page.locator('[data-testid="product-card"]').first();
    await firstCard.click();

    await expect(page.locator('body')).toContainText('Alive');
  });
});
