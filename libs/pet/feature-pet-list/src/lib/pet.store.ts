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
  Filters,
  Pet,
  PaginationLinks,
  GetPetsResponse,
} from '@petsch/api';

export interface PetsState {
  products: Pet[];
  pagination: PaginationLinks;
  filters: Partial<Filters>;
  loading: boolean;
  error: string | null;
}

const initialState: PetsState = {
  products: [],
  pagination: {},
  filters: { _page: 1, _limit: 12 },
  loading: false,
  error: null,
};

export const PetsStore = signalStore(
  withState(initialState),

  withComputed((store) => ({
    query: () => ({
      ...store.filters(),
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

    const setResult = (result: GetPetsResponse) =>
      patchState(store, {
        products: result.products,
        pagination: result.pagination,
        loading: false,
      });

    return {
      updateFilters(filters: Partial<Filters>) {
        patchState(store, { filters: { ...initialState.filters, ...filters } });
      },

      loadProducts: rxMethod<Partial<Filters>>(
        pipe(
          tap(() => setLoading(true)),
          switchMap((query) =>
            productService.getPets(query).pipe(
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
      store.loadProducts(store.query);
    },
  }),
);
