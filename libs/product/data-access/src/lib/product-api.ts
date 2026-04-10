import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Filters, IProductService, Product, calculateHealth } from '@petsch/api';
import { Observable, map } from 'rxjs';

@Injectable()
export class ProductApi implements IProductService {
  private readonly http = inject(HttpClient);
  private readonly baseUrlAPI = 'https://my-json-server.typicode.com/Feverup/fever_pets_data/pets';

  getProducts(filters: Partial<Filters>): Observable<Product[]> {
    let params = new HttpParams();

    if (filters.name) {
      params = params.set('name_like', filters.name);
    }
    if (filters.kind) {
      params = params.set('kind', filters.kind);
    }
    if (filters.page) {
      params = params.set('_page', filters.page.toString());
    }
    if (filters.limit) {
      params = params.set('_limit', filters.limit.toString());
    } else {
      params = params.set('_limit', '10'); // Default limit
    }

    return this.http.get<any[]>(this.baseUrlAPI, {
      params,
    }).pipe(
      map(pets => pets.map(pet => this.mapPetToProduct(pet)))
    );
  }

  getDetails(id: string): Observable<Product> {
    return this.http.get<any>(`${this.baseUrlAPI}/${id}`).pipe(
      map(pet => this.mapPetToProduct(pet))
    );
  }

  private mapPetToProduct(pet: any): Product {
    return {
      ...pet,
      health: calculateHealth(
        pet.kind,
        pet.weight,
        pet.height,
        pet.length,
        pet.number_of_lives
      )
    };
  }
}
