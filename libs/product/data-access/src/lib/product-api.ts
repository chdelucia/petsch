import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Filters, IProductService, Product } from '@petsch/api';
import { Observable } from 'rxjs';

@Injectable()
export class ProductApi implements IProductService {
  private readonly http = inject(HttpClient);
  private readonly base = 'https://rickandmortyapi.com/api/character';
  private readonly baseUrlAPI = 'https://api.escuelajs.co/api/v1/products';

  getProducts(filters: Partial<Filters>): Observable<Product[]> {
    let params = new HttpParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value) params = params.set(key, value);
    });

    return this.http.get<Product[]>(this.baseUrlAPI + '?limit=10&offset=0', {
      params,
    });
  }

  getDetails(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrlAPI}/${id}`);
  }
}
