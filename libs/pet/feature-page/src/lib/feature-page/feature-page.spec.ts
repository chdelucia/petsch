import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeaturePage } from './feature-page';
import { getTranslocoTestingModule } from '@petsch/shared-utils';
import { PRODUCT_LIST_STORE, ITEM_OF_DAY_STORE, PRODUCT_TOKEN } from '@petsch/api';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';
import { LOCALSTORAGE_TOKEN, ANALYTICS_TOKEN } from '@petsch/obs-api';
import { signal } from '@angular/core';

describe('FeaturePage', () => {
  let component: FeaturePage;
  let fixture: ComponentFixture<FeaturePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturePage, getTranslocoTestingModule()],
      providers: [
        provideRouter([]),
        {
          provide: ANALYTICS_TOKEN,
          useValue: { trackAddToFavorites: vi.fn() },
        },
        {
          provide: PRODUCT_TOKEN,
          useValue: {
            getProducts: () => of({ products: [], pagination: {} }),
            getDetails: () => of({}),
          },
        },
        {
          provide: LOCALSTORAGE_TOKEN,
          useValue: {
            getValue: vi.fn(),
            setValue: vi.fn(),
            clearValue: vi.fn(),
            clearAll: vi.fn(),
          },
        },
        {
          provide: PRODUCT_LIST_STORE,
          useValue: {
            products: signal([]),
            loading: signal(false),
            error: signal(null),
            pagination: signal({}),
            filters: signal({}),
            currentPage: signal(1),
            totalPages: signal(1),
            filterName: signal(''),
            loadProducts: vi.fn(),
            applySort: vi.fn(),
            applyFilters: vi.fn(),

            removeFilter: vi.fn(),
          },
        },
        {
          provide: ITEM_OF_DAY_STORE,
          useValue: {
            products: signal([]),
            isOpen: signal(false),
            entries: signal([]),
            sortedEntries: signal([]),
            isItemAddedToday: signal([]),
            addItem: vi.fn(),
            toggleIotd: vi.fn(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle filters', () => {
    expect(component.showFilters()).toBe(true);
    component.toggleFilters();
    expect(component.showFilters()).toBe(false);
  });

  it('should toggle view', () => {
    expect(component.gridView()).toBe(true);
    component.toggleView();
    expect(component.gridView()).toBe(false);
  });

  it('should apply sort and reload products', () => {
    const store = TestBed.inject(PRODUCT_LIST_STORE);
    const sortValue = { key: 'name', order: 'asc' };

    component.sortBy(sortValue);

    expect(store.applySort).toHaveBeenCalledWith(sortValue);
    expect(store.loadProducts).toHaveBeenCalled();
  });
});
