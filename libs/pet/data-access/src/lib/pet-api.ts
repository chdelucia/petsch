import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  IPetService,
  GetPetsResponse,
  PET_API_CONFIG,
  PET_DATA_TRANSFORMER,
} from '@petsch/api';
import { Observable, map } from 'rxjs';
import { parseLinkHeader } from './utils/link-header-parser';

@Injectable()
export class PetApi<T = any, F = any> implements IPetService<T, F> {
  private readonly http = inject(HttpClient);
  private readonly config = inject(PET_API_CONFIG);
  private readonly transformer = inject(PET_DATA_TRANSFORMER, {
    optional: true,
  });

  getPets(filters: Partial<F>): Observable<GetPetsResponse<T>> {
    const params = new HttpParams({
      fromObject: Object.entries(filters).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          acc[key] = value;
        }
        return acc;
      }, {} as Record<string, any>),
    });

    return this.http
      .get<T[]>(this.config.baseUrl, {
        params,
        observe: 'response',
      })
      .pipe(
        map((response) => {
          const linkHeader = response.headers.get('Link');
          const pagination = linkHeader ? parseLinkHeader(linkHeader) : {};
          let products = response.body || [];

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
    return this.http.get<T>(`${this.config.baseUrl}/${id}`).pipe(
      map((item) => {
        if (this.transformer) {
          return this.transformer(item);
        }
        return item;
      }),
    );
  }
}
