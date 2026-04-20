import { test, expect } from '@playwright/test';

test('Dragon Ball app should load and navigate', async ({ page }) => {
  await page.goto('/dragonball');

  // Wait for loading to finish
  await page
    .locator('[data-testid="product-list-loading"]')
    .first()
    .waitFor({ state: 'detached', timeout: 30000 });

  // Check if character cards are loaded
  const cards = page.locator('[data-testid="product-card"]');
  await expect(cards.first()).toBeVisible({ timeout: 30000 });

  // Check name of first character (Goku is usually first)
  await expect(page.getByText('Goku')).toBeVisible();

  // Navigate to details
  await cards.first().click();
  await expect(page).toHaveURL(/\/dragonball\/\d+/);

  // Wait for details loading to finish
  await page
    .locator('[data-testid="product-details-loading"]')
    .waitFor({ state: 'detached', timeout: 30000 });

  // Check details content
  await expect(page.locator('h1')).toContainText('Goku', {
    timeout: 30000,
  });

  // Go back using the button
  const backBtn = page.locator('button').filter({ hasText: /Back/i });
  await backBtn.click();

  // Verify back to list
  await expect(page).toHaveURL(/\/dragonball/);
  await expect(cards.first()).toBeVisible();
});
