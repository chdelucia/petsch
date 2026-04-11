import { test, expect } from '@playwright/test';

test('navigate to details and back', async ({ page }) => {
  await page.goto('/');

  const firstProduct = page.locator('[data-cy="product-card"]').first();
  const productName = await firstProduct.locator('h3').innerText();

  await firstProduct.click();

  // Check we are on details page
  await expect(page).toHaveURL(/\/products\/details\/\d+/);
  const detailsTitle = await page.locator('h1').innerText();
  expect(detailsTitle).toBe(productName);

  // Go back
  await page.click('[data-cy="back-to-list"]');

  // Check we are back on list page
  await expect(page).toHaveURL(/\/products/);
  await expect(page.locator('[data-cy="product-filters"]')).toBeVisible();
});
