import { InjectionToken, Signal } from '@angular/core';
import { Filters, PaginationLinks, Pet } from './models/pet';

export interface PetsStoreContract {
  products: Signal<Pet[]>;
  loading: Signal<boolean>;
  error: Signal<string | null>;
  pagination: Signal<PaginationLinks>;
  filters: Signal<Partial<Filters>>;
  loadProducts(query: Partial<Filters> | Signal<Partial<Filters>>): void;
  updateFilters(filters: Partial<Filters>): void;
}

export const PETLIST_STORE = new InjectionToken<PetsStoreContract>(
  'PETLIST_STORE',
);
