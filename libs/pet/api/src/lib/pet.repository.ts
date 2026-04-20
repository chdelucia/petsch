import { Observable } from 'rxjs';
import { PaginationLinks } from './models/pet';

export interface GetProductsResponse<T = unknown> {
  products: T[];
  pagination: PaginationLinks;
}

export interface IProductService<T = unknown, F = unknown> {
  getProducts(filters: Partial<F>): Observable<GetProductsResponse<T>>;
  getDetails(id: string): Observable<T>;
}
