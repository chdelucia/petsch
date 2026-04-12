import { TestBed } from '@angular/core/testing';
import { productResolver } from './product-details.resolver';
import { PRODUCT_TOKEN } from '@petsch/api';
import { of } from 'rxjs';
import { ActivatedRouteSnapshot, convertToParamMap } from '@angular/router';

describe('productResolver', () => {
  let productServiceMock: any;

  beforeEach(() => {
    productServiceMock = {
      getDetails: vi.fn((id: string) => of({ id, name: 'Test Pet' })),
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: PRODUCT_TOKEN, useValue: productServiceMock },
      ],
    });
  });

  it('should resolve product details using id from route', () => {
    const route = {
      paramMap: convertToParamMap({ id: '123' }),
    } as unknown as ActivatedRouteSnapshot;

    const result = TestBed.runInInjectionContext(() =>
      productResolver(route, {} as any),
    );

    expect(productServiceMock.getDetails).toHaveBeenCalledWith('123');
    result.subscribe((data) => {
      expect(data).toEqual({ id: '123', name: 'Test Pet' });
    });
  });
});
