import { TestBed } from '@angular/core/testing';
import { ProductsStore } from './pet.store';
import { PRODUCT_TOKEN } from '@petsch/api';
import { of } from 'rxjs';

describe('ProductsStore', () => {
  let store: any;
  let productServiceMock: any;

  beforeEach(() => {
    productServiceMock = {
      getProducts: vi.fn(() => of({ products: [], pagination: {} })),
      getDetails: vi.fn((id: string) => of({ id })),
    };

    TestBed.configureTestingModule({
      providers: [
        ProductsStore,
        { provide: PRODUCT_TOKEN, useValue: productServiceMock },
      ],
    });

    store = TestBed.inject(ProductsStore);
  });

  it('should have initial state', () => {
    expect(store.products()).toEqual([]);
    expect(store.loading()).toBeFalsy();
    expect(store.error()).toBeNull();
  });

  it('should load products on init', () => {
    expect(productServiceMock.getProducts).toHaveBeenCalled();
  });

  it('should load products and update state on success', async () => {
    const products = [{ id: '1', name: 'Product 1' }];
    const pagination = { next: 'url' };
    productServiceMock.getProducts.mockReturnValue(of({ products, pagination }));

    await store.loadProducts({ name: 'test' });

    expect(store.products()).toEqual(products);
    expect(store.pagination()).toEqual(pagination);
    expect(store.loading()).toBeFalsy();
    expect(store.filters()).toEqual({
      _page: 1,
      _limit: 12,
    });
  });

  it('should update filters', () => {
    store.applyFilters({ kind: 'dog' });
    expect(store.filters()).toEqual({
      kind: 'dog',
      _page: 1,
      _limit: 12,
    });
  });

  it('should clear products and reset state', () => {
    store.clear();
    expect(store.products()).toEqual([]);
    expect(store.filters()).toEqual({ _limit: 12, _page: 1 });
  });
});
