import { Locator } from '@playwright/test';
import { BasePage } from './base.po';

export class ProductListPage extends BasePage {
  getProductList(): Locator {
    return this.page.getByTestId('product-list');
  }

  getProductCards(): Locator {
    return this.page.getByTestId('product-card');
  }

  getAddButton(index: number): Locator {
    return this.getProductCards().nth(index).getByTestId('product-add-button');
  }

  getPagination(): Locator {
    return this.page.getByTestId('product-list-pagination');
  }

  getPaginationNext(): Locator {
    return this.page.getByTestId('product-list-pagination-next');
  }

  getPaginationPrev(): Locator {
    return this.page.getByTestId('product-list-pagination-prev');
  }

  getSortDropdown(): Locator {
    return this.page.getByTestId('product-sort-dropdown-button');
  }

  getSortOption(key: string, order: string): Locator {
    return this.page.getByTestId(
      `product-sort-dropdown-option-${key}-${order}`,
    );
  }

  async selectSort(key: string, order: string) {
    await this.getSortDropdown().click();
    await this.getSortOption(key, order).click();
  }

  async addItemToDay(index: number) {
    await this.getAddButton(index).click();
  }

  async waitForLoadingToFinish() {
    await this.page
      .getByTestId('product-list-loading')
      .waitFor({ state: 'detached' });
  }
}
