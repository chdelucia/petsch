import { Observable } from 'rxjs';
import { Filters, PaginatedResponse, Product } from './models/product';

export interface IProductService {
  getProducts(filters: Partial<Filters>): Observable<Product[]>;
  getDetails(id: string): Observable<Product>;
}
