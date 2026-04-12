import { InjectionToken, Signal } from '@angular/core';
import { Filters, PaginationLinks, Pet } from './models/pet';

export interface ProductsStoreContract {
  products: Signal<Pet[]>;
  filteredProducts: Signal<Pet[]>;
  loading: Signal<boolean>;
  error: Signal<string | null>;
  pagination: Signal<PaginationLinks>;
  filters: Signal<Partial<Filters>>;
  filterName: Signal<string>;
  loadProducts(): Promise<void>;
  applySort(sort: { key: string; order: string }): void;
  applyFilters(filters: Partial<Filters>): void;
  applyPagination(page: number): void;
  setFilterName(value: string): void;
  removeFilter<K extends keyof Filters>(key: K): void;
}

export const PETLIST_STORE = new InjectionToken<ProductsStoreContract>(
  'PETLIST_STORE',
);
