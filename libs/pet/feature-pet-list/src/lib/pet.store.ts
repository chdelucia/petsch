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
  PET_TOKEN,
  PaginationLinks,
  GetPetsResponse,
  PET_API_CONFIG,
} from '@petsch/api';

export interface PetsState<T = unknown, F = Record<string, unknown>> {
  products: T[];
  pagination: PaginationLinks;
  filters: Partial<F>;
  loading: boolean;
  error: string | null;
}

export const PetsStore = signalStore(
  { providedIn: 'root' },
  withState(() => {
    const config = inject(PET_API_CONFIG, { optional: true });
    const pageKey = config?.paginationKeys?.page ?? '_page';
    const limitKey = config?.paginationKeys?.limit ?? '_limit';

    const state: PetsState = {
      products: [],
      pagination: {},
      filters: { [pageKey]: 1, [limitKey]: 12 } as Record<string, unknown>,
      loading: false,
      error: null,
    };
    return state;
  }),

  withComputed((store) => ({
    query: () => ({
      ...store.filters(),
    }),
  })),

  withMethods((store) => {
    const productService = inject(PET_TOKEN);
    const config = inject(PET_API_CONFIG, { optional: true });

    const pageKey = config?.paginationKeys?.page ?? '_page';
    const limitKey = config?.paginationKeys?.limit ?? '_limit';

    const setLoading = (loading: boolean) =>
      patchState(store, { loading, error: null });

    const setError = (message: string) =>
      patchState(store, {
        loading: false,
        error: message,
        products: [],
      });

    const setResult = (result: GetPetsResponse<unknown>) =>
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
            _sort: sort.key,
            _order: sort.order,
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
            productService.getPets(store.query()).pipe(
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
