import { Observable } from 'rxjs';
import { Filters, Pet, PaginationLinks } from './models/pet';

export interface GetProductsResponse {
  products: Pet[];
  pagination: PaginationLinks;
}

export interface IProductService {
  getProducts(filters: Partial<Filters>): Observable<GetProductsResponse>;
  getDetails(id: string): Observable<Pet>;
}
