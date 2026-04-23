import { Injectable, inject, Provider } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  IProductService,
  GetProductsResponse,
  PRODUCT_TOKEN,
  PRODUCT_DATA_TRANSFORMER,
  ProductDataTransformer,
} from '@petsch/api';
import { buildHttpParams, parseLinkHeader } from '@petsch/data-access';
import { Observable, map } from 'rxjs';

@Injectable()
export class ProductShopApi<T = unknown, F = Record<string, unknown>>
  implements IProductService<T, F>
{
  private readonly http = inject(HttpClient);
  private readonly baseUrl =
    'https://my-json-server.typicode.com/Feverup/fever_pets_data/pets';
  private readonly transformer = inject(PRODUCT_DATA_TRANSFORMER, {
    optional: true,
  }) as ProductDataTransformer<T> | null;

  getProducts(filters: Partial<F>): Observable<GetProductsResponse<T>> {
    const params = buildHttpParams(filters as Record<string, unknown>);

    return this.http
      .get<T[]>(this.baseUrl, {
        params,
        observe: 'response',
      })
      .pipe(
        map((response) => {
          let products = response.body || [];
          const transformer = this.transformer;
          if (transformer) {
            products = products.map((item) => transformer(item));
          }
          const linkHeader = response.headers.get('Link');
          const pagination = linkHeader ? parseLinkHeader(linkHeader) : {};
          return {
            products,
            pagination,
          };
        }),
      );
  }

  getDetails(id: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${id}`).pipe(
      map((item) => {
        if (this.transformer) {
          return this.transformer(item);
        }
        return item;
      }),
    );
  }
}

export function provideProductShopApi(): Provider[] {
  return [
    {
      provide: PRODUCT_TOKEN,
      useClass: ProductShopApi,
    },
  ];
}
