import { TestBed } from '@angular/core/testing';
import { PetsStore } from './pet.store';
import { PET_TOKEN } from '@petsch/api';
import { of } from 'rxjs';

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

  it('should load products on init', async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(productServiceMock.getPets).toHaveBeenCalledWith({
      _page: 1,
      _limit: 12,
    });
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
