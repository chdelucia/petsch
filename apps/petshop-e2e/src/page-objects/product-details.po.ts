import { Locator } from '@playwright/test';
import { BasePage } from './base.po';

export class ProductDetailsPage extends BasePage {
  async gotoProduct(id: number) {
    await this.goto(`/pets/${id}`);
  }

  getProductDetails(): Locator {
    return this.page.getByTestId('product-details');
  }

  getBackButton(): Locator {
    return this.page.getByTestId('product-details-back-button');
  }

  async goBack() {
    await this.getBackButton().click();
  }

  async waitForLoadingToFinish() {
    await this.page
      .getByTestId('product-details-loading')
      .waitFor({ state: 'detached' });
  }
}
