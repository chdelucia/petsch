import { Observable } from 'rxjs';
import { Filters, Pet, PaginationLinks } from './models/pet';

export interface GetPetsResponse {
  products: Pet[];
  pagination: PaginationLinks;
}

export interface IPetService {
  getPets(filters: Partial<Filters>): Observable<GetPetsResponse>;
  getDetails(id: string): Observable<Pet>;
}
