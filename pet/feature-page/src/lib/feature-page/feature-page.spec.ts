import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeaturePage } from './feature-page';
import { getTranslocoTestingModule } from '@petsch/shared-utils';
import { PETLIST_STORE, PETOFDAY_STORE, PET_TOKEN } from '@petsch/api';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';
import { LOCALSTORAGE_TOKEN } from '@petsch/obs-api';
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
          provide: PET_TOKEN,
          useValue: {
            getPets: () => of({ products: [], pagination: {} }),
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
          provide: PETLIST_STORE,
          useValue: {
            products: signal([]),
            filteredProducts: signal([]),
            loading: signal(false),
            error: signal(null),
            pagination: signal({}),
            filters: signal({}),
            filterName: signal(''),
            loadProducts: vi.fn(),
            applySort: vi.fn(),
            applyFilters: vi.fn(),
            setFilterName: vi.fn(),
            removeFilter: vi.fn(),
          },
        },
        {
          provide: PETOFDAY_STORE,
          useValue: {
            products: signal([]),
            isOpen: signal(false),
            entries: signal([]),
            sortedEntries: signal([]),
            isPetAddedToday: signal([]),
            addPet: vi.fn(),
            togglePoT: vi.fn(),
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
});
