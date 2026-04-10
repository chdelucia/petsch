import { computed, inject } from '@angular/core';
import { Product, PRODUCT_TOKEN } from '@petsch/api';
import {
  signalStore,
  withProps,
  withComputed,
  withMethods,
  patchState,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';

export interface ProductDetailsState {
  product: Product | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductDetailsState = {
  product: null,
  loading: false,
  error: null,
};

export const ProductDetailsStore = signalStore(
  withState(initialState),
  withProps(() => ({
    productService: inject(PRODUCT_TOKEN),
  })),
  withMethods((store) => {
    const { productService } = store;

    return {
      loadProduct: rxMethod<string>(
        pipe(
          tap(() => patchState(store, { loading: true, error: null })),
          switchMap((id) =>
            productService.getDetails(id).pipe(
              tap({
                next: (product) => patchState(store, { product, loading: false }),
                error: (err: Error) =>
                  patchState(store, {
                    product: null,
                    loading: false,
                    error: err.message ?? 'Failed to load product details',
                  }),
              }),
            ),
          ),
        ),
      ),
    };
  }),
);
