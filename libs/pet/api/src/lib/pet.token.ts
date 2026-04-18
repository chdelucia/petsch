import { InjectionToken } from '@angular/core';
import { IPetService, GetPetsResponse } from './pet.repository';
import { HttpResponse } from '@angular/common/http';

export const PET_TOKEN = new InjectionToken<IPetService<unknown, unknown>>(
  'PET',
);

export interface PetApiConfig<T = unknown, F = unknown> {
  baseUrl: string;
  getDetailsUrl?: (id: string) => string;
  mapResponse?: (response: HttpResponse<T[] | unknown>) => GetPetsResponse<T>;
  paginationKeys?: {
    page: string;
    limit: string;
  };
  listRoute?: string;
  hideSort?: boolean;
}

export const PET_API_CONFIG = new InjectionToken<PetApiConfig>('PET_API_CONFIG');

export type PetDataTransformer<T = unknown> = (item: T) => T;

export const PET_DATA_TRANSFORMER = new InjectionToken<PetDataTransformer>(
  'PET_DATA_TRANSFORMER',
);
