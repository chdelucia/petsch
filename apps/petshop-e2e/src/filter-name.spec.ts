import { test, expect } from '@playwright/test';

test('filter by name', async ({ page }) => {
  await page.goto('/');

  const searchInput = page.locator('[data-cy="input-filter-name"]');
  await searchInput.fill('Jade');
  await page.waitForTimeout(1500);

  const productCards = page.locator('[data-cy="product-card"]');
  const count = await productCards.count();
  for (let i = 0; i < count; i++) {
    const title = await productCards.nth(i).locator('h3').innerText();
    expect(title.toLowerCase()).toContain('jade');
  }

  // Clear filter
  await page.click('[data-cy="clear-filter-name"]');
  await page.waitForTimeout(1500);

  expect(await productCards.count()).toBeGreaterThan(count || 0);
});
