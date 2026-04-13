import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureFilters } from './feature-filters';
import { PETLIST_STORE, PET_TOKEN } from '@petsch/api';
import { getTranslocoTestingModule } from '@petsch/shared-utils';
import { of } from 'rxjs';
import { signal } from '@angular/core';

describe('FeatureFilters', () => {
  let component: FeatureFilters;
  let fixture: ComponentFixture<FeatureFilters>;
  let store: {
    applyFilters: any;
    removeFilter: any;
    loadProducts: any;
    loading: any;
    products: any;
    filters: any;
  };

  beforeEach(async () => {
    vi.useFakeTimers();

    store = {
      applyFilters: vi.fn(),
      removeFilter: vi.fn(),
      loadProducts: vi.fn(),
      loading: signal(false),
      products: signal([]),
      filters: signal({}),
    };

    await TestBed.configureTestingModule({
      imports: [FeatureFilters, getTranslocoTestingModule()],
      providers: [
        { provide: PETLIST_STORE, useValue: store },
        {
          provide: PET_TOKEN,
          useValue: {
            getPets: () => of({ products: [], pagination: {} }),
            getDetails: () => of({}),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureFilters);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have filterConfigs', () => {
    expect(component.filterConfigs().length).toBe(2);
  });

  it('should call applyFilters when updateFilter is called', () => {
    component.updateFilter('name', 'test');
    expect(store.applyFilters).toHaveBeenCalledWith({ name: 'test' });
  });

  it('should call applyFilters and loadProducts when kind filter changes', () => {
    component.updateFilter('kind', 'dog');
    expect(store.applyFilters).toHaveBeenCalledWith({ kind: 'dog' });
    expect(store.loadProducts).toHaveBeenCalled();
  });

  it('should call removeFilter when resetFilter is called', () => {
    component.resetFilter('name');
    expect(store.removeFilter).toHaveBeenCalledWith('name');
  });

  it('should return activeFilters from store', () => {
    store.filters.set({ name: 'test', kind: 'dog' });
    expect(component.activeFilters).toEqual({
      name: 'test',
      kind: 'dog',
    });
  });
});
