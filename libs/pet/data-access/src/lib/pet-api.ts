import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  IPetService,
  GetPetsResponse,
  PET_API_CONFIG,
  PET_DATA_TRANSFORMER,
  PetDataTransformer,
} from '@petsch/api';
import { Observable, map } from 'rxjs';
import { parseLinkHeader } from './utils/link-header-parser';

@Injectable()
export class PetApi<T = unknown, F = unknown> implements IPetService<T, F> {
  private readonly http = inject(HttpClient);
  private readonly config = inject(PET_API_CONFIG);
  private readonly transformer = inject(PET_DATA_TRANSFORMER, {
    optional: true,
  }) as PetDataTransformer<T> | null;

  getPets(filters: Partial<F>): Observable<GetPetsResponse<T>> {
    const params = new HttpParams({
      fromObject: Object.entries(filters).reduce(
        (acc, [key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            acc[key] = value as
              | string
              | number
              | boolean
              | readonly (string | number | boolean)[];
          }
          return acc;
        },
        {} as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      ),
    });

    return this.http
      .get<T[]>(this.config.baseUrl, {
        params,
        observe: 'response',
      })
      .pipe(
        map((response) => {
          if (this.config.mapResponse) {
            const mapped = this.config.mapResponse(response) as GetPetsResponse<T>;
            if (this.transformer) {
              mapped.products = mapped.products.map((item) =>
                this.transformer!(item),
              );
            }
            return mapped;
          }

          const linkHeader = response.headers.get('Link');
          const pagination = linkHeader ? parseLinkHeader(linkHeader) : {};
          let products = (response.body as T[]) || [];

          if (this.transformer) {
            products = products.map((item) => this.transformer!(item));
          }

          return {
            products,
            pagination,
          };
        }),
      );
  }

  getDetails(id: string): Observable<T> {
    const url = this.config.getDetailsUrl
      ? this.config.getDetailsUrl(id)
      : `${this.config.baseUrl}/${id}`;

    return this.http.get<T>(url).pipe(
      map((item) => {
        if (this.transformer) {
          return this.transformer(item);
        }
        return item;
      }),
    );
  }
}
