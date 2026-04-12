import { TestBed } from '@angular/core/testing';
import { petResolver } from './pet-details.resolver';
import { PET_TOKEN } from '@petsch/api';
import { of } from 'rxjs';
import { ActivatedRouteSnapshot, convertToParamMap } from '@angular/router';

describe('petResolver', () => {
  let productServiceMock: any;

  beforeEach(() => {
    productServiceMock = {
      getDetails: vi.fn((id: string) => of({ id, name: 'Test Pet' })),
    };

    TestBed.configureTestingModule({
      providers: [{ provide: PET_TOKEN, useValue: productServiceMock }],
    });
  });

  it('should resolve product details using id from route', () => {
    const route = {
      paramMap: convertToParamMap({ id: '123' }),
    } as unknown as ActivatedRouteSnapshot;

    const result = TestBed.runInInjectionContext(() =>
      petResolver(route, {} as any),
    );

    expect(productServiceMock.getDetails).toHaveBeenCalledWith('123');
    result.subscribe((data) => {
      expect(data).toEqual({ id: '123', name: 'Test Pet' });
    });
  });
});
