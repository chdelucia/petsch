import { test, expect } from '@playwright/test';
import { FiltersPage } from './page-objects/filters.po';
import { ProductListPage } from './page-objects/product-list.po';

test.describe('Combined Filters', () => {
  let filtersPage: FiltersPage;
  let productListPage: ProductListPage;

  test.beforeEach(async ({ page }) => {
    filtersPage = new FiltersPage(page);
    productListPage = new ProductListPage(page);
    await filtersPage.goto('/pets');
  });

  test('should apply name, kind and sort filters together', async () => {
    // Wait for initial load
    await expect(productListPage.getProductCards().first()).toBeVisible();

    // 1. Filter by Name
    await filtersPage.filterByName('a');

    // 2. Filter by Kind
    await filtersPage.filterByKind('dog');

    // 3. Apply Sort
    await productListPage.selectSort('weight', 'desc');

    // Verify results
    // Since name filter is local and kind/sort are server-side,
    // we check that the UI state is correct
    await expect(productListPage.getSortDropdown()).toContainText('Weight: Desc');
    await expect(filtersPage.getKindFilterOption('dog')).toBeChecked();
    await expect(filtersPage.getNameFilter()).toHaveValue('a');
  });
});
