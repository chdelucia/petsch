import { Observable } from 'rxjs';
import { PaginationLinks } from './models/pet';

export interface GetPetsResponse<T = unknown> {
  products: T[];
  pagination: PaginationLinks;
}

export interface IPetService<T = unknown, F = unknown> {
  getPets(filters: Partial<F>): Observable<GetPetsResponse<T>>;
  getDetails(id: string): Observable<T>;
}
