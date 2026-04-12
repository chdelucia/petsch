import { test, expect } from '@playwright/test';
import { ProductListPage } from './page-objects/product-list.po';

test.describe('Pagination', () => {
  let productListPage: ProductListPage;

  test.beforeEach(async ({ page }) => {
    productListPage = new ProductListPage(page);
    await productListPage.goto('/pets');
  });

  test('should navigate to next and previous pages', async () => {
    await expect(productListPage.getPagination()).toBeVisible();

    // Initial page 1
    await expect(productListPage.page.getByTestId('product-list-pagination-number')).toContainText('1');

    // Go to next page
    await productListPage.getPaginationNext().click();
    await expect(productListPage.page.getByTestId('product-list-pagination-number')).toContainText('2');

    // Go back to previous page
    await productListPage.getPaginationPrev().click();
    await expect(productListPage.page.getByTestId('product-list-pagination-number')).toContainText('1');
  });

  test('should navigate to first and last pages', async () => {
    await expect(productListPage.getPagination()).toBeVisible();

    // Go to last page
    await productListPage.page.getByTestId('product-list-pagination-last').click();
    // Assuming there are multiple pages
    await expect(productListPage.page.getByTestId('product-list-pagination-number')).not.toContainText(' 1 of');

    // Go to first page
    await productListPage.page.getByTestId('product-list-pagination-first').click();
    await expect(productListPage.page.getByTestId('product-list-pagination-number')).toContainText('1');
  });
});
