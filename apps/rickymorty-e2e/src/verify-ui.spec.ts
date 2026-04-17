import { test, expect } from '@playwright/test';

test('Rick & Morty app should load and navigate', async ({ page }) => {
  await page.goto('http://localhost:4200/rickymorty');

  // Check if character cards are loaded
  const cards = page.locator('[data-testid="product-card"]');
  await expect(cards.first()).toBeVisible({ timeout: 15000 });

  // Check name of first character
  await expect(page.getByText('Rick Sanchez')).toBeVisible();

  // Navigate to details
  await cards.first().click();
  await expect(page).toHaveURL(/\/rickymorty\/\d+/);

  // Check details content
  await expect(page.locator('h1')).toContainText('Rick Sanchez');

  // Go back using the button
  const backBtn = page.locator('button').filter({ hasText: /Back/ });
  await backBtn.click();

  // Verify back to list
  await expect(page).toHaveURL(/\/rickymorty/);
  await expect(cards.first()).toBeVisible();
});
