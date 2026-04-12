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

    const buildQuery = (overrides: Partial<Filters>) => {
      return {
        ...store.filtersApplied(),
        ...overrides,
      };
    };

    const setLoading = (loading: boolean) =>
      patchState(store, { loading, error: null });

    const setError = (error: string) =>
      patchState(store, {
        loading: false,
        error,
        products: [],
      });

    const setProducts = (result: any) =>
      patchState(store, {
        products: result.products,
        pagination: result.pagination,
        loading: false,
      });

    return {
      async loadProducts(filters: Partial<Filters>) {
        setLoading(true);

        const query = buildQuery(filters);

        patchState(store, {
          filtersApplied: query,
        });

        try {
          const result = await firstValueFrom(
            productService.getProducts(query),
          );

          setProducts(result);
        } catch (err: unknown) {
          setError((err as Error)?.message ?? 'Failed to load products');
        }
      },

      applyFilters(filters: Partial<Filters>) {
        const { name, ...rest } = filters;
        patchState(store, { filtersApplied: buildQuery(rest)});

        return this.loadProducts({ ...filters, _page: 1 });
      },

      applyPagination(page: number) {
        const filters = store.filtersApplied();
        return this.loadProducts({ ...filters, _page: page });
      },

      setFilterName(value: string) {
        patchState(store, { filterName: value });
      },

      removeFilter(key: keyof Filters) {
        if (key === 'name') {
          patchState(store, { filterName: '' });
          return;
        }

        const current = store.filtersApplied();
        const { [key]: _, ...rest } = current;

        patchState(store, {
          filtersApplied: rest,
        });
      },

      clearProducts() {
        patchState(store, initialState);
      },

      applySort(sort: { key: string; order: string }) {
        const query = buildQuery({
          _page: 1,
          _sort: sort.key,
          _order: sort.order,
        });

        patchState(store, { filtersApplied: query });

        return this.loadProducts(query);
      },
    };
  }),
  withHooks({
    onInit(store) {
      store.loadProducts({ _page: 1, _limit: 12 });
    },
  }),
);
