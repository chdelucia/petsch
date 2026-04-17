import { InjectionToken, Signal } from '@angular/core';
import { PaginationLinks } from './models/pet';

export interface PetsStoreContract<T = any, F = any> {
  products: Signal<T[]>;
  loading: Signal<boolean>;
  error: Signal<string | null>;
  pagination: Signal<PaginationLinks>;
  filters: Signal<Partial<F>>;
  loadProducts(): Promise<void>;
  applySort(sort: { key: string; order: string }): void;
  applyFilters(filters: Partial<F>): void;
  applyPagination(page: number): void;
  removeFilter<K extends keyof F>(key: K): void;
}

export const PETLIST_STORE = new InjectionToken<PetsStoreContract<any, any>>(
  'PETLIST_STORE',
);
