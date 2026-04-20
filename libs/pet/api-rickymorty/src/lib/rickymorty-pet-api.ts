import { Injectable, inject, Provider } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  IPetService,
  GetPetsResponse,
  PET_TOKEN,
  PET_DATA_TRANSFORMER,
  PetDataTransformer,
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
export class RickAndMortyPetApi<T = unknown, F = Record<string, unknown>>
  implements IPetService<T, F>
{
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://rickandmortyapi.com/api/character';
  private readonly transformer = inject(PET_DATA_TRANSFORMER, {
    optional: true,
  }) as PetDataTransformer<T> | null;

  getPets(filters: Partial<F>): Observable<GetPetsResponse<T>> {
    const params = buildHttpParams(filters as Record<string, unknown>);

    return this.http
      .get<CharactersDto>(this.baseUrl, {
        params,
      })
      .pipe(
        map((body) => {
          let products = (body.results as unknown as T[]) || [];
          if (this.transformer) {
            products = products.map((item) => this.transformer!(item));
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

export function provideRickAndMortyPetApi(): Provider[] {
  return [
    {
      provide: PET_TOKEN,
      useClass: RickAndMortyPetApi,
    },
  ];
}
