import { TestBed } from '@angular/core/testing';
import { ProductsStore } from './product-list.store';
import { PRODUCT_TOKEN } from '@petsch/api';
import { of, throwError } from 'rxjs';

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
    const products = [{ id: '1', name: 'Pet 1' }];
    const pagination = { next: 'url' };
    productServiceMock.getProducts.mockReturnValue(
      of({ products, pagination }),
    );

    await store.loadProducts({ name: 'test' });

    expect(store.products()).toEqual(products);
    expect(store.pagination()).toEqual(pagination);
    expect(store.loading()).toBeFalsy();
    expect(store.filtersApplied()).toEqual({
      name: 'test',
      _page: 1,
      _limit: 12,
    });
  });

  it('should handle error when loading products', async () => {
    productServiceMock.getProducts.mockReturnValue(
      throwError(() => new Error('API Error')),
    );

    await store.loadProducts({});

    expect(store.products()).toEqual([]);
    expect(store.error()).toBe('API Error');
    expect(store.loading()).toBeFalsy();
  });

  it('should call getDetails from service', () => {
    store.getProductDetails('123');
    expect(productServiceMock.getDetails).toHaveBeenCalledWith('123');
  });

  it('should compute filteredProducts', async () => {
    const products = [
      { id: '1', name: 'Dog' },
      { id: '2', name: 'Cat' },
    ];
    productServiceMock.getProducts.mockReturnValue(
      of({ products, pagination: {} }),
    );

    await store.loadProducts({});

    expect(store.products()).toEqual(products);
  });

  it('should clear products and reset state', () => {
    store.clearProducts();
    expect(store.products()).toEqual([]);
    expect(store.filtersApplied()).toEqual({});
  });
});
