import { computed, inject } from '@angular/core';
import { Pet, Filters, PRODUCT_TOKEN, PaginationLinks } from '@petsch/api';
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
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  pagination: {},
  filtersApplied: {},
  loading: false,
  error: null,
};

export const ProductsStore = signalStore(
  withState(initialState),
  withProps(() => ({
    productService: inject(PRODUCT_TOKEN),
  })),
  withComputed((store) => ({
    filteredProducts: computed(() => {
      const filters = store.filtersApplied();
      const products = store.products();
      return products.filter((p) => {
        return (
          !filters.name || p.name.toLocaleLowerCase().includes(filters.name)
        );
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
          patchState(store, {
            products: [],
            pagination: {},
            loading: false,
            error: (err as Error)?.message ?? 'Failed to load products',
          });
        }
      },

      updateFilters(filters: Partial<Filters>) {
        patchState(store, {
          filtersApplied: { ...store.filtersApplied(), ...filters },
        });
      },

      clearProducts() {
        patchState(store, initialState);
      },

      getProductDetails(id: string) {
        return productService.getDetails(id);
      },
    };
  }),
  withHooks({
    onInit(store) {
      store.loadProducts({ _page: 1, _limit: 12 });
    },
  }),
);
