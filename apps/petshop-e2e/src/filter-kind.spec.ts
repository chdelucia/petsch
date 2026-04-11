import { test, expect } from '@playwright/test';

test('filter by kind dog and cat', async ({ page }) => {
  await page.goto('/');

  // Filter by DOG
  await page.locator('[data-cy="radio-option-dog"]').click();

  // Wait for the active filter chip to appear and verify products
  await expect(page.locator('[data-cy="active-filter-kind"]')).toContainText('dog', { ignoreCase: true });

  const productCategoriesDog = page.locator('[data-cy="product-category"]');
  await expect(productCategoriesDog.first()).toBeVisible();
  const countsDog = await productCategoriesDog.count();
  for (let i = 0; i < countsDog; i++) {
    await expect(productCategoriesDog.nth(i)).toContainText('dog', { ignoreCase: true });
  }

  // Filter by CAT
  await page.locator('[data-cy="radio-option-cat"]').click();
  await expect(page.locator('[data-cy="active-filter-kind"]')).toContainText('cat', { ignoreCase: true });

  const productCategoriesCat = page.locator('[data-cy="product-category"]');
  await expect(productCategoriesCat.first()).toBeVisible();
  const countsCat = await productCategoriesCat.count();
  for (let i = 0; i < countsCat; i++) {
    await expect(productCategoriesCat.nth(i)).toContainText('cat', { ignoreCase: true });
  }

  // Clear filter
  await page.locator('[data-cy="clear-filter-kind"]').click();
  await expect(page.locator('[data-cy="active-filter-kind"]')).toBeHidden();

  // Verify products are still visible
  await expect(page.locator('[data-cy="product-card"]').first()).toBeVisible();
});
