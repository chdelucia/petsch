import { InjectionToken, Signal } from '@angular/core';
import { PaginationLinks } from './models/pet';

export interface ProductsStoreContract<T = unknown, F = unknown> {
  products: Signal<T[]>;
  loading: Signal<boolean>;
  error: Signal<string | null>;
  pagination: Signal<PaginationLinks>;
  filters: Signal<Partial<F>>;
  currentPage: Signal<number>;
  totalPages: Signal<number>;
  loadProducts(): Promise<void>;
  applySort(sort: { key: string; order: string }): void;
  applyFilters(filters: Partial<F>): void;
  applyPagination(page: number): void;
  removeFilter(key: string): void;
}

export const PRODUCT_LIST_STORE = new InjectionToken<
  ProductsStoreContract<unknown, unknown>
>('PRODUCT_LIST_STORE');
