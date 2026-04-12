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

    await expect(productListPage.getProductCards().first()).toBeVisible();
  });

  test('should filter by kind', async () => {
    await filtersPage.filterByKind('cat');

    await expect(productListPage.getProductCards().first()).toBeVisible();

    await filtersPage.filterByKind('dog');
    await expect(productListPage.getProductCards().first()).toBeVisible();
  });
});
