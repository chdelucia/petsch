import { Injectable, inject, Injector, Provider, runInInjectionContext } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { toObservable } from '@angular/core/rxjs-interop';
import { Observable, combineLatest, filter, map } from 'rxjs';
import {
  IProductService,
  GetProductsResponse,
  PRODUCT_API_URL,
  PRODUCT_DATA_TRANSFORMER,
  PRODUCT_TOKEN,
  PRODUCT_API_MAPPER,
  ProductDataTransformer,
  ApiMapperFn,
} from '@petsch/api';
import { buildHttpParams } from '../utils/http-params';
import { headerLinkApiMapper } from '../utils/api-mappers';

@Injectable()
export class GenericProductApi<T = unknown, F = Record<string, unknown>>
  implements IProductService<T, F>
{
  private readonly baseUrl = inject(PRODUCT_API_URL);
  private readonly injector = inject(Injector);
  private readonly transformer = inject(PRODUCT_DATA_TRANSFORMER, {
    optional: true,
  }) as ProductDataTransformer<T> | null;
  private readonly mapper = inject(PRODUCT_API_MAPPER, {
    optional: true,
  }) as ApiMapperFn<T> | null;

  getProducts(filters: Partial<F>): Observable<GetProductsResponse<T>> {
    const params = buildHttpParams(filters as Record<string, unknown>);

    return runInInjectionContext(this.injector, () => {
      const resource = httpResource<unknown>(() => ({
        url: this.baseUrl,
        params,
      }));

      return combineLatest([
        toObservable(resource.value),
        toObservable(resource.headers),
      ]).pipe(
        filter(([body]) => body !== undefined),
        map(([body, headers]) => {
          const mapFn = this.mapper ?? (headerLinkApiMapper as ApiMapperFn<T>);
          const mapped = mapFn(body, headers);

          if (this.transformer && mapped.products) {
            mapped.products = mapped.products.map((item) => this.transformer!(item));
          }

          return mapped;
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

export function provideGenericProductApi(mapper?: ApiMapperFn): Provider[] {
  return [
    ...(mapper ? [{ provide: PRODUCT_API_MAPPER, useValue: mapper }] : []),
    {
      provide: PRODUCT_TOKEN,
      useClass: GenericProductApi,
    },
  ];
}
