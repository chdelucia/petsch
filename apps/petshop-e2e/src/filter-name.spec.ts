import { test, expect } from '@playwright/test';

test('filter by name', async ({ page }) => {
  await page.goto('/');

  const searchInput = page.locator('[data-cy="input-filter-name"] [data-cy="input-filter-field"]');
  await searchInput.fill('Jade');

  // Wait for the active filter chip to appear
  await expect(page.locator('[data-cy="active-filter-name"]')).toContainText('Jade');

  const productTitles = page.locator('[data-cy="product-card"] h3');
  await expect(productTitles.first()).toBeVisible();

  const count = await productTitles.count();
  for (let i = 0; i < count; i++) {
    await expect(productTitles.nth(i)).toContainText('Jade', { ignoreCase: true });
  }

  // Clear filter
  await page.locator('[data-cy="clear-filter-name"]').click();
  await expect(page.locator('[data-cy="active-filter-name"]')).toBeHidden();

  // Verify products are still visible
  await expect(page.locator('[data-cy="product-card"]').first()).toBeVisible();
});
