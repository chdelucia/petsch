import { test, expect } from '@playwright/test';

test.describe('Dragon Ball Sorting', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dragonball');
    // Wait for loading to finish
    await page
      .locator('[data-testid="product-list-loading"]')
      .first()
      .waitFor({ state: 'detached', timeout: 30000 });
  });

  test('should sort by name ascending', async ({ page }) => {
    // Open sort dropdown
    await page.getByTestId('product-sort-dropdown-button').click();

    // Select Name Asc
    await page.getByTestId('product-sort-dropdown-option-name-asc').click();

    // Wait for reload
    await page.waitForResponse(resp => resp.url().includes('characters') && resp.status() === 200);

    const firstCharacterName = await page.locator('[data-testid="product-card"] h3').first().textContent();
    const secondCharacterName = await page.locator('[data-testid="product-card"] h3').nth(1).textContent();

    // Comparing names (ignoring whitespace)
    expect(firstCharacterName?.trim().localeCompare(secondCharacterName?.trim() ?? '')).toBeLessThanOrEqual(0);
  });
});
