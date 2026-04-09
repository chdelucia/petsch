import { Observable } from 'rxjs';
import { Filters, Product } from './models/product';

export interface IProductService {
  getProducts(filters: Partial<Filters>): Observable<Product[]>;
  getDetails(id: string): Observable<Product>;
}
