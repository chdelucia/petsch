import { computed, inject } from '@angular/core';
import {
  signalStore,
  withState,
  withComputed,
  withMethods,
  withHooks,
  patchState,
} from '@ngrx/signals';

import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import {
  PRODUCT_TOKEN,
  PaginationLinks,
  GetProductsResponse,
  PRODUCT_UI_CONFIG,
} from '@petsch/api';

export interface ProductsState<T = unknown, F = Record<string, unknown>> {
  products: T[];
  pagination: PaginationLinks;
  filters: Partial<F>;
  loading: boolean;
  error: string | null;
}

export const ProductsStore = signalStore(
  { providedIn: 'root' },
  withState(() => {
    const config = inject(PRODUCT_UI_CONFIG, { optional: true });
    const pageKey = config?.paginationKeys?.page ?? '_page';
    const limitKey = config?.paginationKeys?.limit ?? '_limit';

    const state: ProductsState = {
      products: [],
      pagination: {},
      filters: { [pageKey]: 1, [limitKey]: 12 } as Record<string, unknown>,
      loading: false,
      error: null,
    };
    return state;
  }),

  withComputed((store) => {
    const config = inject(PRODUCT_UI_CONFIG, { optional: true });
    const pageKey = config?.paginationKeys?.page ?? '_page';

    return {
      query: () => ({
        ...store.filters(),
      }),
      currentPage: computed(() => {
        return (store.filters() as Record<string, unknown>)[pageKey] as number ?? 1;
      }),
      totalPages: computed(() => {
        const pagination = store.pagination();
        if (pagination.pages) {
          return pagination.pages;
        }
        const last = pagination.last;
        const regex = new RegExp(`${pageKey}=(\\d+)(?:&|$)`);
        const match = last?.match(regex);
        return match ? Number(match[1]) : ((store.filters() as Record<string, unknown>)[pageKey] as number ?? 1);
      }),
    };
  }),

  withMethods((store) => {
    const productService = inject(PRODUCT_TOKEN);
    const config = inject(PRODUCT_UI_CONFIG, { optional: true });

    const pageKey = config?.paginationKeys?.page ?? '_page';
    const limitKey = config?.paginationKeys?.limit ?? '_limit';
    const sortKey = config?.sortKeys?.sort ?? '_sort';
    const orderKey = config?.sortKeys?.order ?? '_order';

    const setLoading = (loading: boolean) =>
      patchState(store, { loading, error: null });

    const setError = (message: string) =>
      patchState(store, {
        loading: false,
        error: message,
        products: [],
      });

    const setResult = (result: GetProductsResponse<unknown>) =>
      patchState(store, {
        products: result.products,
        pagination: result.pagination,
        loading: false,
      });

    return {
      applyFilters(partial: Partial<Record<string, unknown>>) {
        patchState(store, (state) => ({
          filters: { ...state.filters, ...partial, [pageKey]: 1 },
        }));
      },

      applyPagination(page: number) {
        patchState(store, (state) => ({
          filters: { ...state.filters, [pageKey]: page },
        }));
      },

      applySort(sort: { key: string; order: string }) {
        patchState(store, {
          filters: {
            ...store.filters(),
            [sortKey]: sort.key,
            [orderKey]: sort.order,
          },
        });
      },

      removeFilter(key: string) {
        const current = store.filters() as Record<string, unknown>;
        const { [key]: _, ...rest } = current;
        patchState(store, { filters: rest });
      },

      clear() {
        patchState(store, (state) => ({
          ...state,
          products: [],
          pagination: {},
          filters: { [pageKey]: 1, [limitKey]: 12 } as Record<string, unknown>,
          loading: false,
          error: null,
        }));
      },

      loadProducts: rxMethod<void>(
        pipe(
          tap(() => setLoading(true)),
          switchMap(() =>
            productService.getProducts(store.query()).pipe(
              catchError((err) => {
                setError(err?.message ?? 'Failed to load products');
                return of(null);
              }),
            ),
          ),
          tap((result) => {
            if (result) setResult(result);
          }),
        ),
      ),
    };
  }),

  withHooks({
    onInit(store) {
      store.loadProducts();
    },
  }),
);
