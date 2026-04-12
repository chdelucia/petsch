import { test, expect } from '@playwright/test';
import { ProductListPage } from './page-objects/product-list.po';

test.describe('Sorting', () => {
  let productListPage: ProductListPage;

  test.beforeEach(async ({ page }) => {
    productListPage = new ProductListPage(page);
    await productListPage.goto('/pets');
  });

  test('should sort by name ascending and descending', async () => {
    await productListPage.selectSort('name', 'asc');
    await expect(productListPage.getSortDropdown()).toContainText('Name: Asc');
    await expect(productListPage.getProductCards().first()).toBeVisible();

    await productListPage.selectSort('name', 'desc');
    await expect(productListPage.getSortDropdown()).toContainText('Name: Desc');
    await expect(productListPage.getProductCards().first()).toBeVisible();
  });

  test('should sort by weight', async () => {
    await productListPage.selectSort('weight', 'asc');
    await expect(productListPage.getSortDropdown()).toContainText('Weight: Asc');
    await expect(productListPage.getProductCards().first()).toBeVisible();

    await productListPage.selectSort('weight', 'desc');
    await expect(productListPage.getSortDropdown()).toContainText('Weight: Desc');
    await expect(productListPage.getProductCards().first()).toBeVisible();
  });

  test('should sort by height', async () => {
    await productListPage.selectSort('height', 'asc');
    await expect(productListPage.getSortDropdown()).toContainText('Height: Asc');

    await productListPage.selectSort('height', 'desc');
    await expect(productListPage.getSortDropdown()).toContainText('Height: Desc');
  });
});
