import { getTranslocoTestingModule } from '@petsch/shared-utils';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeaturePetList } from './feature-pet-list';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { PETLIST_STORE, PETOFDAY_STORE, PET_TOKEN } from '@petsch/api';
import { LOCALSTORAGE_TOKEN } from '@petsch/obs-api';
import { signal } from '@angular/core';

describe('FeaturePetList', () => {
  let component: FeaturePetList;
  let fixture: ComponentFixture<FeaturePetList>;
  let store: any;

  beforeEach(async () => {
    store = {
      applyFilters: vi.fn(),
      clearProducts: vi.fn(),
      showFilters: signal(true),
      gridView: signal(true),
      filteredProducts: signal([]),
      loading: signal(false),
      error: signal(null),
      pagination: signal({}),
      filters: signal({}),
      loadProducts: vi.fn(),
      applyPagination: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [getTranslocoTestingModule(), FeaturePetList],
      providers: [
        { provide: PETLIST_STORE, useValue: store },
        provideRouter([]),
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
          provide: PET_TOKEN,
          useValue: {
            getPets: () => of({ products: [], pagination: {} }),
            getDetails: () => of({}),
          },
        },
        {
          provide: PETOFDAY_STORE,
          useValue: {
            entries: signal([]),
            isPetAddedToday: signal(false),
            addPet: vi.fn(),
            removePet: vi.fn(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturePetList);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('showFilters', true);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call handlePageChange and call store.loadProducts', () => {
    store.filters.set({ name: 'test' });
    component.handlePageChange(2);
    expect(store.applyPagination).toHaveBeenCalledWith(2);
  });

  it('should call handlePotdClick and call potdStore.addPet if not added today', () => {
    const pet = { id: '1' } as any;
    const spy = vi.spyOn(component['potdStore'], 'addPet');
    component.handlePotdClick(pet);
    expect(spy).toHaveBeenCalledWith(pet);
  });
});
