import { Locator } from '@playwright/test';
import { BasePage } from './base.po';

export class FiltersPage extends BasePage {
  getNameFilter(): Locator {
    return this.page.getByTestId('filter-name_like-input');
  }

  getKindFilterOption(kind: string): Locator {
    return this.page.getByTestId(`filter-kind-radio-option-${kind}`);
  }

  async filterByName(name: string) {
    await this.getNameFilter().fill(name);
  }

  async filterByKind(kind: string) {
    await this.getKindFilterOption(kind).click();
  }
}
