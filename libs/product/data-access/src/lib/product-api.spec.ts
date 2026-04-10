import { TestBed } from '@angular/core/testing';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ProductApi } from './product-api';
import { Pet } from '@petsch/api';

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

    service.getProducts({ name, page }).subscribe();

    const req = httpMock.expectOne((req) =>
      req.url.includes(service['baseUrlAPI']),
    );
    expect(req.request.url).toEqual(
      'https://my-json-server.typicode.com/Feverup/fever_pets_data/pets',
    );
    expect(req.request.params.get('name')).toEqual('Batman');
    expect(req.request.params.get('page')).toEqual('1');
    expect(req.request.method).toBe('GET');

    req.flush({} as Pet);
  });

  it('should send a GET request with correct URL and return data', () => {
    const id = '123';
    const testData: Partial<any> = { id: 3 };

    service.getDetails(id).subscribe();
    const req = httpMock.expectOne(
      `https://my-json-server.typicode.com/Feverup/fever_pets_data/pets/${id}`,
    );
    expect(req.request.method).toBe('GET');
    req.flush(testData);
  });
});
