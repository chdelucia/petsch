import { Injectable, Provider } from '@angular/core';
import {
  GenericProductApi,
  provideGenericProductApi,
  headerLinkApiMapper,
} from '@petsch/data-access';

@Injectable()
export class PetShopApi<T = unknown, F = Record<string, unknown>> extends GenericProductApi<T, F> {}

export function providePetShopApi(): Provider[] {
  return provideGenericProductApi(headerLinkApiMapper);
}
