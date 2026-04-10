import { Observable } from 'rxjs';
import { Filters, Pet } from './models/product';

export interface IProductService {
  getProducts(filters: Partial<Filters>): Observable<Pet[]>;
  getDetails(id: string): Observable<Pet>;
}
