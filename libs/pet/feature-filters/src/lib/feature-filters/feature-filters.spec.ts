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
    query: any;
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
      query: signal({}),
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
    expect(component.filterConfigs().kindOptions.length).toBe(2);
  });

  it('should call applyFilters when kind filter changes', () => {
    store.applyFilters.mockClear();
    component.localModel.set({ name_like: '', kind: 'dog' });
    fixture.detectChanges();
    vi.runAllTimers();

    expect(store.applyFilters).toHaveBeenCalledWith(expect.objectContaining({
      kind: 'dog',
    }));
  });

  it('should reset name filter', () => {
    component.localModel.set({ name_like: 'test', kind: '' });
    fixture.detectChanges();

    component.resetFilter('name_like');
    fixture.detectChanges();
    vi.runAllTimers();

    expect(component.localModel().name_like).toBe('');
  });

  it('should return activeFilters from store', () => {
    store.filters.set({ name_like: 'test', kind: 'dog' });
    fixture.detectChanges();

    expect(component.activeFilters).toEqual({
      name_like: 'test',
      kind: 'dog',
    });
  });
});
