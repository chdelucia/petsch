import { test, expect } from '@playwright/test';
import { ProductListPage } from './page-objects/product-list.po';

test.describe('Product of the Day', () => {
  let productListPage: ProductListPage;

  test.beforeEach(async ({ page }) => {
    productListPage = new ProductListPage(page);
    await productListPage.goto('/products');
  });

  test('should add a product to product of the day and open drawer', async () => {
    await expect(productListPage.getProductCards().first()).toBeVisible();
    await productListPage.addProductToDay(0);

    const drawer = productListPage.getCartDrawer();
    await expect(drawer).toBeVisible();

    const items = productListPage.getCartItems();
    await expect(items).toHaveCount(1);
  });

  test('should close the drawer', async () => {
    await expect(productListPage.getProductCards().first()).toBeVisible();
    await productListPage.addProductToDay(0);
    const drawer = productListPage.getCartDrawer();
    await expect(drawer).toBeVisible();

    await productListPage.getCartDrawerCloseButton().click();
    await expect(drawer).not.toHaveClass('ch-cart-drawer-container--open');
  });
});
