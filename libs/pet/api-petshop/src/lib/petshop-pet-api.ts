import { Injectable, inject, Provider } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  IPetService,
  GetPetsResponse,
  PET_TOKEN,
  PET_DATA_TRANSFORMER,
  PetDataTransformer,
} from '@petsch/api';
import { buildHttpParams, parseLinkHeader } from '@petsch/data-access';
import { Observable, map } from 'rxjs';

@Injectable()
export class PetShopPetApi<T = unknown, F = Record<string, unknown>>
  implements IPetService<T, F>
{
  private readonly http = inject(HttpClient);
  private readonly baseUrl =
    'https://my-json-server.typicode.com/Feverup/fever_pets_data/pets';
  private readonly transformer = inject(PET_DATA_TRANSFORMER, {
    optional: true,
  }) as PetDataTransformer<T> | null;

  getPets(filters: Partial<F>): Observable<GetPetsResponse<T>> {
    const params = buildHttpParams(filters as Record<string, unknown>);

    return this.http
      .get<T[]>(this.baseUrl, {
        params,
        observe: 'response',
      })
      .pipe(
        map((response) => {
          let products = response.body || [];
          if (this.transformer) {
            products = products.map((item) => this.transformer!(item));
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

export function providePetShopPetApi(): Provider[] {
  return [
    {
      provide: PET_TOKEN,
      useClass: PetShopPetApi,
    },
  ];
}
