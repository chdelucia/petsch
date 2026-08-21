import { Injectable, Provider } from '@angular/core';
import {
  GenericProductApi,
  provideGenericProductApi,
  dragonballApiMapper,
} from '@petsch/data-access';

export interface DragonballDto {
  items: unknown[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
  links: {
    first: string;
    previous: string;
    next: string;
    last: string;
  };
}

@Injectable()
export class DragonBallProductApi<
  T = unknown,
  F = Record<string, unknown>,
> extends GenericProductApi<T, F> {}

export function provideDragonBallProductApi(): Provider[] {
  return provideGenericProductApi(dragonballApiMapper);
}
