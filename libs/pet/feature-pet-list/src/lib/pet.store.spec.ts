import { TestBed } from '@angular/core/testing';
import { ProductsStore } from './pet.store';
import { PRODUCT_TOKEN, PRODUCT_UI_CONFIG } from '@petsch/api';
import { of, throwError } from 'rxjs';
import { MONITORING_TOKEN } from '@petsch/obs-api';

describe('ProductsStore', () => {
  let store: any;
  let productServiceMock: any;
  let monitoringMock: any;

  beforeEach(() => {
    productServiceMock = {
      getProducts: vi.fn(() => of({ products: [], pagination: {} })),
      getDetails: vi.fn((id: string) => of({ id })),
    };

    monitoringMock = {
      captureException: vi.fn(),
      captureMessage: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        ProductsStore,
        { provide: PRODUCT_TOKEN, useValue: productServiceMock },
        { provide: MONITORING_TOKEN, useValue: monitoringMock },
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

  it('should apply sort', () => {
    store.applySort({ key: 'name', order: 'asc' });
    expect(store.filters()).toEqual({
      _page: 1,
      _limit: 12,
      _sort: 'name',
      _order: 'asc',
    });
  });

  it('should remove filter', () => {
    store.applyFilters({ kind: 'dog' });
    store.removeFilter('kind');
    expect(store.filters()).not.toHaveProperty('kind');
    expect(store.filters()).toEqual({ _page: 1, _limit: 12 });
  });

  it('should apply pagination', () => {
    store.applyPagination(2);
    expect(store.filters()).toEqual({ _page: 2, _limit: 12 });
  });

  it('should compute totalPages correctly from last link', () => {
    store.clear();
    const products = [{ id: '1' }];
    const pagination = { last: 'http://api.example.com/products?_page=5&_limit=12' };
    productServiceMock.getProducts.mockReturnValue(of({ products, pagination }));

    store.loadProducts();

    expect(store.totalPages()).toBe(5);
  });

  it('should compute totalPages correctly from pages property', () => {
    store.clear();
    const products = [{ id: '1' }];
    const pagination = { pages: 10 };
    productServiceMock.getProducts.mockReturnValue(of({ products, pagination }));

    store.loadProducts();

    expect(store.totalPages()).toBe(10);
  });

  it('should handle load error by masking it and tracking exception', async () => {
    const error = new Error('API Error');
    productServiceMock.getProducts.mockReturnValue(throwError(() => error));

    store.loadProducts();

    expect(store.error()).toBe('Failed to load products');
    expect(store.products()).toEqual([]);
    expect(monitoringMock.captureException).toHaveBeenCalledWith(error);
  });

  describe('with custom config', () => {
    let customStore: any;

    beforeEach(() => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          ProductsStore,
          { provide: PRODUCT_TOKEN, useValue: productServiceMock },
          { provide: MONITORING_TOKEN, useValue: monitoringMock },
          {
            provide: PRODUCT_UI_CONFIG,
            useValue: {
              paginationKeys: { page: 'p', limit: 'l' },
              sortKeys: { sort: 's', order: 'o' },
            },
          },
        ],
      });
      customStore = TestBed.inject(ProductsStore);
    });

    it('should use custom keys', () => {
      expect(customStore.filters()).toEqual({ p: 1, l: 12 });
      customStore.applySort({ key: 'price', order: 'desc' });
      expect(customStore.filters()).toEqual({ p: 1, l: 12, s: 'price', o: 'desc' });
    });
  });
});
