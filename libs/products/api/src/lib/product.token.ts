import { InjectionToken } from '@angular/core';
import { IProductService } from './product-service.interface';

export const PRODUCT_TOKEN = new InjectionToken<
  IProductService<unknown, unknown>
>('PRODUCT');

export const PRODUCT_API_URL = new InjectionToken<string>('PRODUCT_API_URL');

export type ProductDataTransformer<T = unknown> = (item: T) => T;

export const PRODUCT_DATA_TRANSFORMER = new InjectionToken<ProductDataTransformer>(
  'PRODUCT_DATA_TRANSFORMER',
);
