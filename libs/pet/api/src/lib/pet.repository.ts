import { Observable } from 'rxjs';
import { PaginationLinks } from './models/pet';

export interface GetPetsResponse<T = any> {
  products: T[];
  pagination: PaginationLinks;
}

export interface IPetService<T = any, F = any> {
  getPets(filters: Partial<F>): Observable<GetPetsResponse<T>>;
  getDetails(id: string): Observable<T>;
}
