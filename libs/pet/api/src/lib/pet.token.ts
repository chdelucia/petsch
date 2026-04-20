import { InjectionToken } from '@angular/core';
import { IProductService } from './pet.repository';

export const PRODUCT_TOKEN = new InjectionToken<IProductService<unknown, unknown>>(
  'PRODUCT',
);

export type ProductDataTransformer<T = unknown> = (item: T) => T;

export const PRODUCT_DATA_TRANSFORMER = new InjectionToken<ProductDataTransformer>(
  'PRODUCT_DATA_TRANSFORMER',
);
