import { TestBed } from '@angular/core/testing';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ProductApi } from './product-api';
import { Product } from '@petsch/api';

describe('Products', () => {
  let service: ProductApi;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductApi, provideHttpClientTesting()],
    });
    service = TestBed.inject(ProductApi);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a GET request with correct filter parameters', () => {
    const name = 'Batman';
    const page = 1;
    const expectedUrl = `https://api.escuelajs.co/api/v1/products?limit=10&offset=0&name=${name}&page=${page}`;

    service.getProducts({ name, page }).subscribe();

    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.url).toEqual(
      'https://api.escuelajs.co/api/v1/products?limit=10&offset=0',
    );
    expect(req.request.params.toString()).toEqual('name=Batman&page=1');
    expect(req.request.method).toBe('GET');

    req.flush({} as Product);
  });

  it('should send a GET request with correct URL and return data', () => {
    const id = '123';
    const testData: Partial<Product> = { id: '3' };

    service.getDetails(id).subscribe();
    const req = httpMock.expectOne(
      `https://api.escuelajs.co/api/v1/products/${id}`,
    );
    expect(req.request.method).toBe('GET');
    req.flush(testData);
  });
});
