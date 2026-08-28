import { InjectionToken } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { IProductService, GetProductsResponse } from './product.repository';

export const PRODUCT_API_URL = new InjectionToken<string>('PRODUCT_API_URL');

export const PRODUCT_TOKEN = new InjectionToken<IProductService<unknown, unknown>>(
  'PRODUCT',
);

export type ProductDataTransformer<T = unknown> = (item: T) => T;

export const PRODUCT_DATA_TRANSFORMER = new InjectionToken<ProductDataTransformer>(
  'PRODUCT_DATA_TRANSFORMER',
);

export type ApiMapperFn<T = unknown> = (
  body: unknown,
  headers?: HttpHeaders | null,
) => GetProductsResponse<T>;

export const PRODUCT_API_MAPPER = new InjectionToken<ApiMapperFn>('PRODUCT_API_MAPPER');
