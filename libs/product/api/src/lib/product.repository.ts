import { Observable } from 'rxjs';
import { Filters, Pet, PaginationLinks } from './models/product';

export interface GetProductsResponse {
  products: Pet[];
  pagination: PaginationLinks;
}

export interface IProductService {
  getProducts(
    filters: Partial<Filters> | string,
  ): Observable<GetProductsResponse>;
  getDetails(id: string): Observable<Pet>;
}
