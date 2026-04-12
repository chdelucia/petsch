import { test, expect } from '@playwright/test';
import { ProductListPage } from './page-objects/product-list.po';

test.describe('Product List', () => {
  let productListPage: ProductListPage;

  test.beforeEach(async ({ page }) => {
    productListPage = new ProductListPage(page);
    await productListPage.goto('/pets');
  });

  test('should display product cards', async () => {
    await expect(productListPage.getProductList()).toBeVisible();
    const cards = productListPage.getProductCards();
    await expect(cards).not.toHaveCount(0);
  });

  test('should navigate through pagination', async () => {
    const pagination = productListPage.getPagination();
    await expect(pagination).toBeVisible();

    await productListPage.getPaginationNext().click();
    await expect(productListPage.page.getByTestId('product-list-pagination-number')).toContainText('2');

    await productListPage.getPaginationPrev().click();
    await expect(productListPage.page.getByTestId('product-list-pagination-number')).toContainText('1');
  });

  test('should sort products', async () => {
    const firstProductBefore = productListPage.getProductCards().first();
    const firstNameBefore = await firstProductBefore.locator('h3').innerText();

    await productListPage.selectSort('name', 'asc');

    await expect(productListPage.getProductCards().first()).toBeVisible();

    await productListPage.selectSort('weight', 'desc');
    await expect(productListPage.getProductCards().first()).toBeVisible();
  });
});
