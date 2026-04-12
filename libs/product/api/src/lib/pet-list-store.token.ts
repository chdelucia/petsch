import { InjectionToken, Signal } from '@angular/core';
import { Filters, PaginationLinks, Pet } from './models/product';

export interface ProductsStoreContract {
  products: Signal<Pet[]>;
  filteredProducts: Signal<Pet[]>;
  loading: Signal<boolean>;
  error: Signal<string | null>;
  pagination: Signal<PaginationLinks>;
  filtersApplied: Signal<Partial<Filters>>;
  filterName: Signal<string>;
  loadProducts(filters: Partial<Filters>): Promise<void>;
  applySort(sort: { key: string; order: string }): Promise<void>;
  applyFilters(filters: Partial<Filters>): Promise<void>;
  applyPagination(page: number): Promise<void>;
  setFilterName(value: string): void;
  removeFilter<K extends keyof Filters>(key: K): void;
}

export const PETLIST_STORE = new InjectionToken<ProductsStoreContract>(
  'PETLIST_STORE',
);
