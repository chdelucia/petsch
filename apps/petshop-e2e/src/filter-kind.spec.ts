import { test, expect } from '@playwright/test';

test('filter by kind dog and cat', async ({ page }) => {
  await page.goto('/');

  // Filter by DOG
  await page.locator('[data-cy="radio-option-dog"]').dispatchEvent('click');
  // Wait for loading and local filter
  await page.waitForTimeout(1500);

  const productCardsDog = page.locator('[data-cy="product-card"]');
  const countsDog = await productCardsDog.count();
  for (let i = 0; i < countsDog; i++) {
    const category = await productCardsDog.nth(i).locator('[data-cy="product-category"]').innerText();
    expect(category.toLowerCase()).toContain('dog');
  }

  // Filter by CAT
  await page.locator('[data-cy="radio-option-cat"]').dispatchEvent('click');
  await page.waitForTimeout(1500);

  const productCardsCat = page.locator('[data-cy="product-card"]');
  const countsCat = await productCardsCat.count();
  for (let i = 0; i < countsCat; i++) {
    const category = await productCardsCat.nth(i).locator('[data-cy="product-category"]').innerText();
    expect(category.toLowerCase()).toContain('cat');
  }

  // Clear filter
  await page.click('[data-cy="clear-filter-kind"]');
  await page.waitForTimeout(1500);

  // Verify more products or different categories appear (basic check)
  const productCardsAll = page.locator('[data-cy="product-card"]');
  expect(await productCardsAll.count()).toBeGreaterThan(0);
});
