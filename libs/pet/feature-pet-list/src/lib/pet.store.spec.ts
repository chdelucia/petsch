import { TestBed } from '@angular/core/testing';
import { PetsStore } from './pet.store';
import { PET_TOKEN } from '@petsch/api';
import { of, throwError } from 'rxjs';

describe('PetsStore', () => {
  let store: any;
  let productServiceMock: any;

  beforeEach(() => {
    productServiceMock = {
      getPets: vi.fn(() => of({ products: [], pagination: {} })),
      getDetails: vi.fn((id: string) => of({ id })),
    };

    TestBed.configureTestingModule({
      providers: [
        PetsStore,
        { provide: PET_TOKEN, useValue: productServiceMock },
      ],
    });

    store = TestBed.inject(PetsStore);
  });

  it('should have initial state', () => {
    expect(store.products()).toEqual([]);
    expect(store.loading()).toBeFalsy();
    expect(store.error()).toBeNull();
  });

  it('should load products on init', () => {
    expect(productServiceMock.getPets).toHaveBeenCalled();
  });

  it('should load products and update state on success', async () => {
    const products = [{ id: '1', name: 'Pet 1' }];
    const pagination = { next: 'url' };
    productServiceMock.getPets.mockReturnValue(of({ products, pagination }));

    await store.loadProducts({ name: 'test' });

    expect(store.products()).toEqual(products);
    expect(store.pagination()).toEqual(pagination);
    expect(store.loading()).toBeFalsy();
    expect(store.filters()).toEqual({
      _page: 1,
      _limit: 12,
    });
  });

  it('should compute products', async () => {
    const products = [
      { id: '1', name: 'Dog' },
      { id: '2', name: 'Cat' },
    ];
    productServiceMock.getPets.mockReturnValue(
      of({ products, pagination: {} }),
    );

    await store.loadProducts({});

    expect(store.products()).toEqual(products);

    store.setFilterName('dog');
    expect(store.products()).toEqual([{ id: '1', name: 'Dog' }]);

    store.setFilterName('cat');
    expect(store.products()).toEqual([{ id: '2', name: 'Cat' }]);
  });

  it('should update filters', () => {
    store.applyFilters({ kind: 'dog' });
    expect(store.filters()).toEqual({
      kind: 'dog',
      _page: 1,
      _limit: 12,
    });
  });

  it('should remove filter', () => {
    store.applyFilters({ kind: 'dog' });
    store.removeFilter('kind');
    expect(store.filters()).toEqual({ _page: 1, _limit: 12 });

    store.setFilterName('test');
    expect(store.filterName()).toBe('test');
    store.removeFilter('name');
    expect(store.filterName()).toBe('');
  });

  it('should clear products and reset state', () => {
    store.clear();
    expect(store.products()).toEqual([]);
    expect(store.filters()).toEqual({ _limit: 12, _page: 1 });
  });
});
