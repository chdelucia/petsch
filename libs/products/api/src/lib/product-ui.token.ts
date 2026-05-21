import { InjectionToken } from '@angular/core';

export interface ProductUiConfig {
  paginationKeys?: {
    page: string;
    limit: string;
  };
  sortKeys?: {
    sort: string;
    order: string;
  };
  listRoute?: string;
  hideSort?: boolean;
}

export const PRODUCT_UI_CONFIG = new InjectionToken<ProductUiConfig>(
  'PRODUCT_UI_CONFIG',
);
