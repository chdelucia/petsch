import { InjectionToken } from '@angular/core';
import { IPetService, GetPetsResponse } from './pet.repository';
import { HttpResponse } from '@angular/common/http';

export const PET_TOKEN = new InjectionToken<IPetService<unknown, unknown>>(
  'PET',
);

export type PetDataTransformer<T = unknown> = (item: T) => T;

export const PET_DATA_TRANSFORMER = new InjectionToken<PetDataTransformer>(
  'PET_DATA_TRANSFORMER',
);
