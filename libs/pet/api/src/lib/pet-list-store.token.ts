import { InjectionToken, Signal } from '@angular/core';
import { PaginationLinks } from './models/pet';

export interface PetsStoreContract<T = unknown, F = unknown> {
  products: Signal<T[]>;
  loading: Signal<boolean>;
  error: Signal<string | null>;
  pagination: Signal<PaginationLinks>;
  filters: Signal<Partial<F>>;
  loadProducts(): Promise<void>;
  applySort(sort: { key: string; order: string }): void;
  applyFilters(filters: Partial<F>): void;
  applyPagination(page: number): void;
  removeFilter(key: string): void;
}

export const PETLIST_STORE = new InjectionToken<
  PetsStoreContract<unknown, unknown>
>('PETLIST_STORE');
