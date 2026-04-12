import { computed, inject } from '@angular/core';
import { Pet, Filters, PRODUCT_TOKEN, PaginationLinks } from '@petsch/api';
import { ObservabilityFacade } from '@petsch/obs-api';
import {
  signalStore,
  withProps,
  withComputed,
  withMethods,
  withHooks,
  patchState,
  withState,
} from '@ngrx/signals';
import { firstValueFrom } from 'rxjs';

export interface ProductsState {
  products: Pet[];
  pagination: PaginationLinks;
  filtersApplied: Partial<Filters>;
  filterName: string;
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  pagination: {},
  filtersApplied: {},
  filterName: '',
  loading: false,
  error: null,
};

export const ProductsStore = signalStore(
  withState(initialState),
  withProps(() => ({
    productService: inject(PRODUCT_TOKEN),
    obsFacade: inject(ObservabilityFacade),
  })),
  withComputed((store) => ({
    filteredProducts: computed(() => {
      const filterName = store.filterName();
      const products = store.products();
      return products.filter((p) => {
        return !filterName || p.name.toLocaleLowerCase().includes(filterName);
      });
    }),
  })),
  withMethods((store) => {
    const { productService } = store;

    return {
      async loadProducts(filters: Partial<Filters>) {
        patchState(store, {
          loading: true,
          error: null,
        });
        patchState(store, {
          filtersApplied: { ...store.filtersApplied(), ...filters },
        });

        try {
          const result = await firstValueFrom(
            productService.getProducts(filters),
          );
          patchState(store, {
            products: result.products,
            pagination: result.pagination,
            loading: false,
          });
        } catch (err: unknown) {
          // Log error to monitoring service for internal debugging
          // but show a generic message to the user to avoid leaking system details
          store.obsFacade.trackError(err);
          patchState(store, {
            products: [],
            pagination: {},
            loading: false,
            error: 'Failed to load products',
          });
        }
      },

      updateFilters(filters: Partial<Filters>) {
        const { name, ...otherFilters } = filters;
        patchState(store, {
          filtersApplied: { ...store.filtersApplied(), ...otherFilters },
        });
      },

      setFilterName(value: string) {
        patchState(store, { filterName: value });
      },

      removeFilter<K extends keyof Filters>(key: K) {
        if (key === 'name') {
          patchState(store, { filterName: '' });
        } else {
          const current = store.filtersApplied();
          const { [key]: _, ...rest } = current;
          patchState(store, {
            filtersApplied: rest,
          });
        }
      },

      clearProducts() {
        patchState(store, initialState);
      },
    };
  }),
  withHooks({
    onInit(store) {
      store.loadProducts({ _page: 1, _limit: 12 });
    },
  }),
);
