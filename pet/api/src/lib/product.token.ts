import { InjectionToken } from '@angular/core';
import { IProductService } from './product.repository';

export const PRODUCT_TOKEN = new InjectionToken<IProductService>('PRODUCT');
