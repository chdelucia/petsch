import { test, expect } from '@playwright/test';
import { ProductListPage } from './page-objects/product-list.po';

test.describe('Pet of the Day', () => {
  let productListPage: ProductListPage;

  test.beforeEach(async ({ page }) => {
    productListPage = new ProductListPage(page);
    await productListPage.goto('/pets');
  });

  test('should add a pet to pet of the day and open drawer', async () => {
    await expect(productListPage.getProductCards().first()).toBeVisible();
    await productListPage.addPetToDay(0);

    const drawer = productListPage.getCartDrawer();
    await expect(drawer).toBeVisible();

    const items = productListPage.getCartItems();
    await expect(items).toHaveCount(1);
  });

  test('should close the drawer', async () => {
    await expect(productListPage.getProductCards().first()).toBeVisible();
    await productListPage.addPetToDay(0);
    const drawer = productListPage.getCartDrawer();
    await expect(drawer).toBeVisible();

    await productListPage.getCartDrawerCloseButton().click();
    await expect(drawer).toBeHidden();
  });

  test('should remove pet from the day', async () => {
    await expect(productListPage.getProductCards().first()).toBeVisible();
    await productListPage.addPetToDay(0);
    const items = productListPage.getCartItems();
    await expect(items).toHaveCount(1);

    const removeButton = items.first().getByTestId('cart-item-remove');
    await removeButton.click();

    await expect(items).toHaveCount(0, { timeout: 10000 });
  });
});
