import { TestBed } from '@angular/core/testing';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ProductApi } from './pet-api';
import { PRODUCT_API_CONFIG, PRODUCT_DATA_TRANSFORMER } from '@petsch/api';

describe('products', () => {
  let service: ProductApi;
  let httpMock: HttpTestingController;
  const baseUrl = 'https://api.example.com/products';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductApi,
        provideHttpClientTesting(),
        {
          provide: PRODUCT_API_CONFIG,
          useValue: { baseUrl },
        },
        {
          provide: PRODUCT_DATA_TRANSFORMER,
          useValue: (item: any) => ({ ...item, health: 'healthy' }),
        },
      ],
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

    service.getProducts({ name, page } as any).subscribe((response) => {
      expect(response.products.length).toBe(1);
      expect(response.products[0].name).toBe('Batman');
    });

    const req = httpMock.expectOne((req) => req.url.includes(baseUrl));
    expect(req.request.url).toEqual(baseUrl);
    expect(req.request.params.get('name')).toEqual('Batman');
    expect(req.request.params.get('page')).toEqual('1');
    expect(req.request.method).toBe('GET');

    req.flush([
      { name: 'Batman', kind: 'dog', weight: 10, height: 1, length: 1 },
    ]);
  });

  it('should send a GET request with correct URL and return data', () => {
    const id = '123';
    const testData = {
      id: 3,
      kind: 'dog',
      weight: 10,
      height: 1,
      length: 1,
    };

    service.getDetails(id).subscribe((product) => {
      expect(product.id).toBe(3);
      expect(product.health).toBe('healthy');
    });
    const req = httpMock.expectOne(`${baseUrl}/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(testData);
  });
});
