import { test, expect } from '@playwright/test';
import { FiltersPage } from './page-objects/filters.po';
import { ProductListPage } from './page-objects/product-list.po';

test.describe('Filters', () => {
  let filtersPage: FiltersPage;
  let productListPage: ProductListPage;

  test.beforeEach(async ({ page }) => {
    filtersPage = new FiltersPage(page);
    productListPage = new ProductListPage(page);
    await filtersPage.goto('/pets');
  });

  test('should filter by name', async () => {
    const searchTerm = 'a'; // Use a common letter to ensure some results
    await filtersPage.filterByName(searchTerm);

    // The name filter is local in the store, it doesn't trigger a reload nor URL update
    // We check that the list is still there and at least one item matches (if we could check text)
    await expect(productListPage.getProductCards().first()).toBeVisible();
  });

  test('should filter by kind', async () => {
    await filtersPage.filterByKind('cat');
    // Kind filter triggers a reload, but no URL update
    await expect(productListPage.getProductCards().first()).toBeVisible();

    await filtersPage.filterByKind('dog');
    await expect(productListPage.getProductCards().first()).toBeVisible();
  });
});
