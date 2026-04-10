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
        const matchesName = !filters.name || p.name.toLowerCase().includes(filters.name.toLowerCase());
        const matchesKind = !filters.kind || p.kind.toLowerCase() === filters.kind.toLowerCase();

        return matchesName && matchesKind;
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
        } catch (err: unknown) {
          patchState(store, {
            products: [],
            loading: false,
            error: (err as Error)?.message ?? 'Failed to load products',
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
