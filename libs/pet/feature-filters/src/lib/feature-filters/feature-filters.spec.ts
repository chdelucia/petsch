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

  it('should create form controls based on filterConfigs', () => {
    expect(component.formTree.name_like).toBeDefined();
    expect(component.formTree.kind).toBeDefined();

    expect(component.filterConfigs().length).toBe(2);
  });

  it('should call applyFilters when kind filter changes', () => {
    component.formTree.kind().value.set('dog');
    vi.runAllTimers();

    expect(store.applyFilters).toHaveBeenCalledWith({
      kind: 'dog',
      name_like: '',
    });
  });

  it('should reset name filter and call removeFilter', () => {
    component.formTree.name_like().value.set('test');

    component.resetFilter('name_like');
    vi.runAllTimers();

    expect(component.formTree.name_like().value()).toBe('');
    expect(store.removeFilter).toHaveBeenCalledWith('name_like');
  });

  it('should reset kind filter and call applyFilters + removeFilter', () => {
    component.formTree.kind().value.set('dog');
    store.applyFilters.mockClear();

    component.resetFilter('kind');
    vi.runAllTimers();

    expect(component.formTree.kind().value()).toBe('');
    expect(store.removeFilter).toHaveBeenCalledWith('kind');

    expect(store.applyFilters).toHaveBeenCalledWith({
      kind: '',
      name_like: '',
    });
  });

  it('should return form values', () => {
    component.formTree.name_like().value.set('test');
    component.formTree.kind().value.set('dog');

    expect(component.form()).toEqual({
      name_like: 'test',
      kind: 'dog',
    });
  });
});
