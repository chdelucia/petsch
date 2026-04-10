import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Filters, IProductService, Pet, GetProductsResponse, enrichPetWithHealth } from '@petsch/api';
import { Observable, map } from 'rxjs';
import { parseLinkHeader } from './utils/link-header-parser';

@Injectable()
export class ProductApi implements IProductService {
  private readonly http = inject(HttpClient);
  private readonly baseUrlAPI =
    'https://my-json-server.typicode.com/Feverup/fever_pets_data/pets';

  getProducts(filters: Partial<Filters>): Observable<GetProductsResponse> {
    let params = new HttpParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value) params = params.set(key, value);
    });

    return this.http
      .get<Pet[]>(this.baseUrlAPI, {
        params,
        observe: 'response',
      })
      .pipe(
        map((response) => {
          const linkHeader = response.headers.get('Link');
          const pagination = linkHeader ? parseLinkHeader(linkHeader) : {};
          const products = (response.body || []).map((pet) =>
            enrichPetWithHealth(pet),
          );

          return {
            products,
            pagination,
          };
        }),
      );
  }

  getDetails(id: string): Observable<Pet> {
    return this.http
      .get<Pet>(`${this.baseUrlAPI}/${id}`)
      .pipe(map((pet) => enrichPetWithHealth(pet)));
  }
}
