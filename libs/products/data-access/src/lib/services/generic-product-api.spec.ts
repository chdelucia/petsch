import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {
  PRODUCT_API_URL,
  PRODUCT_DATA_TRANSFORMER,
  PRODUCT_API_MAPPER,
} from '@petsch/api';
import { GenericProductApi, provideGenericProductApi } from './generic-product-api';
import { headerLinkApiMapper } from '../utils/api-mappers';

describe('GenericProductApi Service', () => {
  let service: GenericProductApi;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        GenericProductApi,
        { provide: PRODUCT_API_URL, useValue: 'https://api.test/items' },
        {
          provide: PRODUCT_DATA_TRANSFORMER,
          useValue: (item: any) => ({ ...item, transformed: true }),
        },
        { provide: PRODUCT_API_MAPPER, useValue: headerLinkApiMapper },
      ],
    });

    service = TestBed.inject(GenericProductApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should provide generic product api with mapper provider array', () => {
    const providers = provideGenericProductApi(headerLinkApiMapper);
    expect(providers.length).toBe(2);
  });
});
