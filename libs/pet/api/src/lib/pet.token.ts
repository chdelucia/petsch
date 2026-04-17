import { InjectionToken } from '@angular/core';
import { IPetService } from './pet.repository';

export const PET_TOKEN = new InjectionToken<IPetService<any, any>>('PET');

export interface PetApiConfig {
  baseUrl: string;
}

export const PET_API_CONFIG = new InjectionToken<PetApiConfig>('PET_API_CONFIG');

export type PetDataTransformer<T = any> = (item: T) => T;

export const PET_DATA_TRANSFORMER = new InjectionToken<PetDataTransformer>(
  'PET_DATA_TRANSFORMER',
);
