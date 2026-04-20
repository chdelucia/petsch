import { Injectable, inject, Provider } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  IProductService,
  GetProductsResponse,
  PRODUCT_TOKEN,
  PRODUCT_DATA_TRANSFORMER,
  ProductDataTransformer,
} from '@petsch/api';
import { buildHttpParams } from '@petsch/data-access';
import { Observable, map } from 'rxjs';

export interface DragonballDto {
  items: unknown[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
  links: {
    first: string;
    previous: string;
    next: string;
    last: string;
  };
}

@Injectable()
export class DragonBallProductApi<T = unknown, F = Record<string, unknown>>
  implements IProductService<T, F>
{
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://dragonball-api.com/api/characters';
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
          if (Array.isArray(body)) {
            let products = body as T[];
            if (this.transformer) {
              products = products.map((item) => this.transformer!(item));
            }
            return {
              products,
              pagination: {
                pages: 1,
              },
            };
          }

          let products = (body.items as unknown as T[]) || [];
          if (this.transformer) {
            products = products.map((item) => this.transformer!(item));
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
