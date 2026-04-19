import { InjectionToken } from '@angular/core';
import { IProductService, GetProductsResponse } from './pet.repository';
import { HttpResponse } from '@angular/common/http';

export const PRODUCT_TOKEN = new InjectionToken<IProductService<unknown, unknown>>(
  'PRODUCT',
);

export interface ProductApiConfig<T = unknown, F = unknown> {
  baseUrl: string;
  getDetailsUrl?: (id: string) => string;
  mapResponse?: (response: HttpResponse<T[] | unknown>) => GetProductsResponse<T>;
  paginationKeys?: {
    page: string;
    limit: string;
  };
  listRoute?: string;
}

export const PRODUCT_API_CONFIG = new InjectionToken<ProductApiConfig>('PRODUCT_API_CONFIG');

export type ProductDataTransformer<T = unknown> = (item: T) => T;

export const PRODUCT_DATA_TRANSFORMER = new InjectionToken<ProductDataTransformer>(
  'PRODUCT_DATA_TRANSFORMER',
);
