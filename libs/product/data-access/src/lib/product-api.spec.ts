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
    const name = 'Jade';
    const kind = 'dog';

    service.getProducts({ name, kind }).subscribe();

    const req = httpMock.expectOne((req) => req.url.includes(service['baseUrlAPI']));
    expect(req.request.url).toEqual(
      'https://my-json-server.typicode.com/Feverup/fever_pets_data/pets',
    );
    expect(req.request.params.get('name_like')).toEqual('Jade');
    expect(req.request.params.get('kind')).toEqual('dog');
    expect(req.request.method).toBe('GET');

    req.flush([]);
  });

  it('should calculate health correctly when mapping response', () => {
    const mockPets = [
      {
        id: 1,
        name: 'Jade',
        kind: 'dog',
        weight: 2741,
        height: 20,
        length: 35,
        photo_url: 'url',
        description: 'desc'
      }
    ];

    service.getProducts({}).subscribe(products => {
      expect(products[0].health).toBe('healthy'); // 2741 / (20 * 35) = 3.91
    });

    const req = httpMock.expectOne((req) => req.url.includes(service['baseUrlAPI']));
    req.flush(mockPets);
  });

  it('should send a GET request with correct URL for details and return mapped data', () => {
    const id = '1';
    const mockPet = {
      id: 1,
      name: 'Stinky',
      kind: 'cat',
      weight: 6712,
      height: 25,
      length: 52,
      photo_url: 'url',
      description: 'desc',
      number_of_lives: 5
    };

    service.getDetails(id).subscribe(product => {
      expect(product.name).toBe('Stinky');
      expect(product.health).toBe('unhealthy'); // 6712 / (25 * 52) = 5.16
    });
    const req = httpMock.expectOne(
      `https://my-json-server.typicode.com/Feverup/fever_pets_data/pets/${id}`,
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockPet);
  });
});
