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
import { PET_TOKEN, Filters, Pet, PaginationLinks } from '@petsch/api';

export interface PetsState {
  products: Pet[];
  pagination: PaginationLinks;
  filters: Partial<Filters>;
  filterName: string;
  loading: boolean;
  error: string | null;
}

const initialState: PetsState = {
  products: [],
  pagination: {},
  filters: { _page: 1, _limit: 12 },
  filterName: '',
  loading: false,
  error: null,
};

export const PetsStore = signalStore(
  withState(initialState),

  withComputed((store) => ({
    query: () => ({
      ...store.filters(),
      ...(store.filterName() ? { name: store.filterName() } : {}),
    }),
    filteredProducts: computed(() => {
      const filterName = store.filterName();
      const products = store.products();
      return products.filter((p) => {
        return !filterName || p.name.toLocaleLowerCase().includes(filterName);
      });
    }),
  })),

  withMethods((store) => {
    const productService = inject(PET_TOKEN);

    const setLoading = (loading: boolean) =>
      patchState(store, { loading, error: null });

    const setError = (message: string) =>
      patchState(store, {
        loading: false,
        error: message,
        products: [],
      });

    const setResult = (result: any) =>
      patchState(store, {
        products: result.products,
        pagination: result.pagination,
        loading: false,
      });

    return {
      setFilterName(value: string) {
        patchState(store, { filterName: value });
      },

      applyFilters(partial: Partial<Filters>) {
        patchState(store, {
          filters: { ...store.filters(), ...partial, _page: 1 },
        });
      },

      applyPagination(page: number) {
        patchState(store, {
          filters: { ...store.filters(), _page: page },
        });
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

      removeFilter(key: keyof Filters) {
        if (key === 'name') {
          patchState(store, { filterName: '' });
          return;
        }
        const current = store.filters();
        const { [key]: _, ...rest } = current;
        patchState(store, { filters: rest });
      },

      clear() {
        patchState(store, initialState);
      },

      /**
       * Performance optimization: use rxMethod with switchMap to handle product loading.
       * This ensures that if multiple requests are fired in rapid succession (e.g., fast filtering
       * or pagination), only the latest request is processed and previous ones are cancelled.
       *
       * Impact:
       * - Reduces unnecessary network traffic.
       * - Prevents race conditions where an older response might overwrite a newer one.
       */
      loadProducts: rxMethod<void>(
        pipe(
          tap(() => setLoading(true)),
          switchMap(() =>
            productService.getPets(store.query()).pipe(
              catchError((err) => {
                setError(err?.message ?? 'Failed to load products');
                return of(null);
              }),
            )
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
