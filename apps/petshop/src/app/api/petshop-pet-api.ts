import { Injectable, inject, Provider, Injector, runInInjectionContext } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { toObservable } from '@angular/core/rxjs-interop';
import {
  IProductService,
  GetProductsResponse,
  PRODUCT_TOKEN,
  PRODUCT_DATA_TRANSFORMER,
  ProductDataTransformer,
  PRODUCT_API_URL,
} from '@petsch/api';
import { buildHttpParams, parseLinkHeader } from '@petsch/data-access';
import { Observable, map, filter, combineLatest } from 'rxjs';

@Injectable()
export class PetShopApi<T = unknown, F = Record<string, unknown>>
  implements IProductService<T, F>
{
  private readonly baseUrl = inject(PRODUCT_API_URL);
  private readonly injector = inject(Injector);
  private readonly transformer = inject(PRODUCT_DATA_TRANSFORMER, {
    optional: true,
  }) as ProductDataTransformer<T> | null;

  getProducts(filters: Partial<F>): Observable<GetProductsResponse<T>> {
    const params = buildHttpParams(filters as Record<string, unknown>);

    return runInInjectionContext(this.injector, () => {
      const resource = httpResource<T[]>(() => ({
        url: this.baseUrl,
        params,
      }));

      return combineLatest([
        toObservable(resource.value),
        toObservable(resource.headers),
      ]).pipe(
        filter(([body, headers]) => body !== undefined && headers !== undefined),
        map(([body, headers]) => {
          let products = body || [];
          const transformer = this.transformer;
          if (transformer) {
            products = products.map((item) => transformer(item));
          }
          const linkHeader = headers ? headers.get('Link') : null;
          const pagination = linkHeader ? parseLinkHeader(linkHeader) : {};
          return {
            products,
            pagination,
          };
        }),
      );
    });
  }

  getDetails(id: string): Observable<T> {
    return runInInjectionContext(this.injector, () => {
      const resource = httpResource<T>(() => `${this.baseUrl}/${id}`);

      return toObservable(resource.value).pipe(
        filter((item): item is T => item !== undefined),
        map((item) => {
          if (this.transformer) {
            return this.transformer(item);
          }
          return item;
        }),
      );
    });
  }
}

export function providePetShopApi(): Provider[] {
  return [
    {
      provide: PRODUCT_TOKEN,
      useClass: PetShopApi,
    },
  ];
}
