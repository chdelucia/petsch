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
  filtersPending: Partial<Filters>;
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  pagination: {},
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
      });
    }),
    currentPage: computed(() => {
      const pagination = store.pagination();
      if (pagination.next) {
        const url = new URL(pagination.next);
        const page = url.searchParams.get('_page');
        return page ? parseInt(page) - 1 : 1;
      }
      if (pagination.prev) {
        const url = new URL(pagination.prev);
        const page = url.searchParams.get('_page');
        return page ? parseInt(page) + 1 : 1;
      }
      return 1;
    }),
    totalPages: computed(() => {
      const pagination = store.pagination();
      if (pagination.last) {
        const url = new URL(pagination.last);
        const page = url.searchParams.get('_page');
        return page ? parseInt(page) : 1;
      }
      return 1;
    }),
  })),
  withMethods((store) => {
    const { productService } = store;

    return {
      async loadProducts(filters: Partial<Filters>) {
        const currentFilters = store.filtersApplied();
        const nextFilters = {
          _page: 1,
          _limit: 5,
          ...currentFilters,
          ...filters,
        };

        patchState(store, {
          filtersPending: nextFilters,
          filtersApplied: nextFilters,
          loading: true,
          error: null,
        });

        try {
          const result = await firstValueFrom(
            productService.getProducts(nextFilters),
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
