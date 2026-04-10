import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Filters, IProductService, Pet } from '@petsch/api';
import { Observable } from 'rxjs';

@Injectable()
export class ProductApi implements IProductService {
  private readonly http = inject(HttpClient);
  private readonly baseUrlAPI =
    'https://my-json-server.typicode.com/Feverup/fever_pets_data/pets';

  getProducts(filters: Partial<Filters>): Observable<Pet[]> {
    let params = new HttpParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value) params = params.set(key, value);
    });

    return this.http.get<Pet[]>(this.baseUrlAPI, {
      params,
    });
  }

  getDetails(id: string): Observable<Pet> {
    return this.http.get<Pet>(`${this.baseUrlAPI}/${id}`);
  }
}
