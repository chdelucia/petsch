import { Injectable, inject, Provider } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  IProductService,
  GetProductsResponse,
  PRODUCT_TOKEN,
  PRODUCT_API_URL,
  PRODUCT_DATA_TRANSFORMER,
  ProductDataTransformer,
} from '@petsch/api';
import { buildHttpParams } from '@petsch/data-access';
import { Observable, map } from 'rxjs';
import { DragonballDto } from './models/dragonball';

@Injectable()
export class DragonBallProductApi<T = unknown, F = Record<string, unknown>>
  implements IProductService<T, F>
{
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(PRODUCT_API_URL);
  private readonly transformer = inject(PRODUCT_DATA_TRANSFORMER, {
    optional: true,
  }) as ProductDataTransformer<T> | null;

  getProducts(filters: Partial<F>): Observable<GetProductsResponse<T>> {
    const params = buildHttpParams(filters as Record<string, unknown>);

    return this.http
      .get<T[] | DragonballDto>(this.baseUrl, {
        params,
      })
      .pipe(
        map((body) => {
          const transformer = this.transformer;
          if (Array.isArray(body)) {
            let products = body as T[];
            if (transformer) {
              products = products.map((item) => transformer(item));
            }
            return {
              products,
              pagination: {
                pages: 1,
              },
            };
          }

          let products = (body.items as unknown as T[]) || [];
          if (transformer) {
            products = products.map((item) => transformer(item));
          }
          return {
            products,
            pagination: {
              pages: body.meta.totalPages,
              next: body.links.next || undefined,
              prev: body.links.previous || undefined,
            },
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

export function provideDragonBallProductApi(): Provider[] {
  return [
    {
      provide: PRODUCT_TOKEN,
      useClass: DragonBallProductApi,
    },
  ];
}
