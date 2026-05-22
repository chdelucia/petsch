import { computed, effect, inject, untracked } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  signalStore,
  withState,
  withComputed,
  withMethods,
  withHooks,
  patchState,
} from '@ngrx/signals';

import { catchError, distinctUntilChanged, of, pipe, switchMap, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import {
  PRODUCT_TOKEN,
  PaginationLinks,
  GetProductsResponse,
  PRODUCT_UI_CONFIG,
} from '@petsch/api';

export interface ProductsState<T = unknown, F = Record<string, unknown>> {
  products: T[];
  pagination: PaginationLinks;
  filters: Partial<F>;
  loading: boolean;
  error: string | null;
}

export const ProductsStore = signalStore(
  { providedIn: 'root' },
  withState(() => {
    const config = inject(PRODUCT_UI_CONFIG, { optional: true });
    const pageKey = config?.paginationKeys?.page ?? '_page';
    const limitKey = config?.paginationKeys?.limit ?? '_limit';

    const state: ProductsState = {
      products: [],
      pagination: {},
      filters: { [pageKey]: 1, [limitKey]: 12 } as Record<string, unknown>,
      loading: false,
      error: null,
    };
    return state;
  }),

  withComputed((store) => {
    const config = inject(PRODUCT_UI_CONFIG, { optional: true });
    const pageKey = config?.paginationKeys?.page ?? '_page';

    return {
      query: computed(() => ({
        ...store.filters(),
      })),
      currentPage: computed(() => {
        return (store.filters() as Record<string, unknown>)[pageKey] as number ?? 1;
      }),
      totalPages: computed(() => {
        const pagination = store.pagination();
        if (pagination.pages) {
          return pagination.pages;
        }
        const last = pagination.last;
        const regex = new RegExp(`${pageKey}=(\\d+)(?:&|$)`);
        const match = last?.match(regex);
        return match ? Number(match[1]) : ((store.filters() as Record<string, unknown>)[pageKey] as number ?? 1);
      }),
    };
  }),

  withMethods((store) => {
    const productService = inject(PRODUCT_TOKEN);
    const config = inject(PRODUCT_UI_CONFIG, { optional: true });
    const router = inject(Router);
    const route = inject(ActivatedRoute);

    const pageKey = config?.paginationKeys?.page ?? '_page';
    const limitKey = config?.paginationKeys?.limit ?? '_limit';
    const sortKey = config?.sortKeys?.sort ?? '_sort';
    const orderKey = config?.sortKeys?.order ?? '_order';

    const setLoading = (loading: boolean) =>
      patchState(store, { loading, error: null });

    const setError = (message: string) =>
      patchState(store, {
        loading: false,
        error: message,
        products: [],
      });

    const setResult = (result: GetProductsResponse<unknown>) =>
      patchState(store, {
        products: result.products,
        pagination: result.pagination,
        loading: false,
      });

    const cleanFilters = (filters: Record<string, unknown>) => {
      return Object.entries(filters).reduce((acc, [key, value]) => {
        if (value !== '' && value !== null && value !== undefined) {
          acc[key] = value;
        }
        return acc;
      }, {} as Record<string, unknown>);
    };

    return {
      applyFilters(partial: Partial<Record<string, unknown>>) {
        patchState(store, (state) => ({
          filters: cleanFilters({ ...state.filters, ...partial, [pageKey]: 1 }),
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
            [sortKey]: sort.key,
            [orderKey]: sort.order,
          },
        });
      },

      removeFilter(key: string) {
        const current = store.filters() as Record<string, unknown>;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

      loadProducts: rxMethod<Record<string, unknown>>(
        pipe(
          distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)),
          tap(() => setLoading(true)),
          switchMap((query) =>
            productService.getProducts(query).pipe(
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
      const route = inject(ActivatedRoute);
      const router = inject(Router);

      const queryParams = route.snapshot.queryParams;
      if (Object.keys(queryParams).length > 0) {
        patchState(store, (state) => ({
          filters: { ...state.filters, ...queryParams },
        }));
      }

      store.loadProducts(store.query);

      effect(() => {
        const query = store.query();
        untracked(() => {
          const currentParams = route.snapshot.queryParams;
          const merged = { ...currentParams, ...query };

          // Identify keys that were removed from store but exist in URL
          Object.keys(currentParams).forEach(key => {
            if (!(key in query)) {
              merged[key] = null;
            }
          });

          if (JSON.stringify(currentParams) !== JSON.stringify(query)) {
            router.navigate([], {
              relativeTo: route,
              queryParams: merged,
              queryParamsHandling: 'merge',
              replaceUrl: true,
            });
          }
        });
      });
    },
  }),
);
