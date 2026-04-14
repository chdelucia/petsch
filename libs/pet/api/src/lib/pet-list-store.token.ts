import { InjectionToken, Signal } from '@angular/core';
import { Filters, PaginationLinks, Pet } from './models/pet';

export interface PetsStoreContract {
  products: Signal<Pet[]>;
  loading: Signal<boolean>;
  error: Signal<string | null>;
  pagination: Signal<PaginationLinks>;
  filters: Signal<Partial<Filters>>;
  loadProducts(): Promise<void>;
  applySort(sort: { key: string; order: string }): void;
  applyFilters(filters: Partial<Filters>): void;
  applyPagination(page: number): void;
  removeFilter<K extends keyof Filters>(key: K): void;
}

export const PETLIST_STORE = new InjectionToken<PetsStoreContract>(
  'PETLIST_STORE',
);
