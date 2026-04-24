import { test, expect } from '@playwright/test';

test.describe('Rick & Morty Pagination', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/rickymorty');
    // Wait for loading to finish
    await page
      .locator('[data-testid="product-list-loading"]')
      .first()
      .waitFor({ state: 'detached', timeout: 30000 });
  });

  test('should navigate to next page', async ({ page }) => {
    const firstPageFirstCharacter = page.locator('[data-testid="product-card"]').first();

    const nextBtn = page.getByTestId('product-list-pagination-next');
    await nextBtn.click();

    // Wait for reload
    await page.waitForResponse(resp => resp.url().includes('character') && resp.status() === 200);

    const secondPageFirstCharacter = await page.locator('[data-testid="product-card"]').first().textContent();

    await expect(firstPageFirstCharacter).not.toHaveText(secondPageFirstCharacter);
    await expect(page).toHaveURL(/page=2/);
  });
});
