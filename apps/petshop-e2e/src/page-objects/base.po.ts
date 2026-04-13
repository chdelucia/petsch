import { Page, Locator } from '@playwright/test';

export abstract class BasePage {
  constructor(protected page: Page) {}

  async goto(path = '/') {
    await this.page.goto(path);
  }

  getCartDrawer(): Locator {
    return this.page.getByTestId('cart-drawer');
  }

  getCartItems(): Locator {
    return this.page.getByTestId('cart-item');
  }

  getCartDrawerCloseButton(): Locator {
    return this.page.getByTestId('cart-drawer-close');
  }

  getCartFooterCloseButton(): Locator {
    return this.page.getByTestId('cart-drawer-footer-close');
  }
}
