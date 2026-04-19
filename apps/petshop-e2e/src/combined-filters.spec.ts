import { test, expect } from '@playwright/test';
import { FiltersPage } from './page-objects/filters.po';
import { ProductListPage } from './page-objects/product-list.po';

test.describe('Combined Filters', () => {
  let filtersPage: FiltersPage;
  let productListPage: ProductListPage;

  test.beforeEach(async ({ page }) => {
    filtersPage = new FiltersPage(page);
    productListPage = new ProductListPage(page);
    await filtersPage.goto('/products');
  });

  test('should apply name, kind and sort filters together', async () => {
    await expect(productListPage.getProductCards().first()).toBeVisible();

    await filtersPage.filterByName('a');

    await filtersPage.filterByKind('dog');

    await productListPage.selectSort('weight', 'desc');

    await expect(productListPage.getSortDropdown()).toContainText(
      'Weight: Desc',
    );
    await expect(filtersPage.getKindFilterOption('dog')).toBeChecked();
    await expect(filtersPage.getNameFilter()).toHaveValue('a');
  });
});
