import { computed, inject } from '@angular/core';
import { Product, Filters, PRODUCT_TOKEN } from '@petsch/api';
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
  products: Product[];
  filtersApplied: Partial<Filters>;
  filtersPending: Partial<Filters>;
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  filtersApplied: {},
  filtersPending: {},
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
        return !filters.name || p.name.includes(filters.name);
        /**return (
          (!filters.name || p.name.includes(filters.name)) &&
          (!filters.gender || p.gender === filters.gender) &&
          (!filters.species || p.species === filters.species) &&
          (!filters.status || p.status === filters.status)
        );*/
      });
    }),
  })),
  withMethods((store) => {
    const { productService } = store;

    return {
      async loadProducts(filters: Partial<Filters>) {
        patchState(store, {
          filtersPending: filters,
          loading: true,
          error: null,
        });
        patchState(store, {
          filtersApplied: { ...store.filtersApplied(), ...filters },
        });

        try {
          const result: Product[] = await firstValueFrom(
            productService.getProducts(filters),
          );
          patchState(store, { products: result, loading: false });
        } catch (err: any) {
          patchState(store, {
            products: [],
            loading: false,
            error: err?.message ?? 'Failed to load products',
          });
        }
      },

      updateFilters(filters: Partial<Filters>) {
        patchState(store, {
          filtersPending: { ...store.filtersPending(), ...filters },
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
      store.loadProducts({});
    },
  }),
);
