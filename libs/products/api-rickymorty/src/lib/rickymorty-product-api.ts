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

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
}

export interface CharactersDto {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}

@Injectable()
export class RickAndMortyProductApi<T = unknown, F = Record<string, unknown>>
  implements IProductService<T, F>
{
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://rickandmortyapi.com/api/character';
  private readonly transformer = inject(PRODUCT_DATA_TRANSFORMER, {
    optional: true,
  }) as ProductDataTransformer<T> | null;

  getProducts(filters: Partial<F>): Observable<GetProductsResponse<T>> {
    const params = buildHttpParams(filters as Record<string, unknown>);

    return this.http
      .get<CharactersDto>(this.baseUrl, {
        params,
      })
      .pipe(
        map((body) => {
          let products = (body.results as unknown as T[]) || [];
          const transformer = this.transformer;
          if (transformer) {
            products = products.map((item) => transformer(item));
          }
          return {
            products,
            pagination: {
              pages: body.info.pages,
              next: body.info.next || undefined,
              prev: body.info.prev || undefined,
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

export function provideRickAndMortyProductApi(): Provider[] {
  return [
    {
      provide: PRODUCT_TOKEN,
      useClass: RickAndMortyProductApi,
    },
  ];
}
