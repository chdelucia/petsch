import { computed, inject } from '@angular/core';
import {
  signalStore,
  withState,
  withComputed,
  withMethods,
  withHooks,
  patchState,
} from '@ngrx/signals';

import { catchError, of } from 'rxjs';
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

      loadProducts() {
        setLoading(true);

        const query = store.query();

        productService
          .getPets(query)
          .pipe(
            catchError((err) => {
              setError(err?.message ?? 'Failed to load products');
              return of(null);
            }),
          )
          .subscribe((result) => {
            if (!result) return;
            setResult(result);
          });
      },
    };
  }),

  withHooks({
    onInit(store) {
      store.loadProducts();
    },
  }),
);
