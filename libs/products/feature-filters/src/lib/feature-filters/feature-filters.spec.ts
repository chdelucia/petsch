import '@angular/compiler';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { FeatureFilters, PRODUCT_FILTER_CONFIG } from './feature-filters';
import { PRODUCT_LIST_STORE, PRODUCT_TOKEN } from '@petsch/api';
import { getTranslocoTestingModule } from '@petsch/shared-utils';
import { of } from 'rxjs';
import { signal, Signal } from '@angular/core';
import { Mock } from 'vitest';

describe('FeatureFilters', () => {
  let component: FeatureFilters;
  let fixture: ComponentFixture<FeatureFilters>;
  let store: {
    applyFilters: Mock<[Partial<Record<string, unknown>>], void>;
    removeFilter: Mock<[string], void>;
    loadProducts: Mock<[], void>;
    loading: Signal<boolean>;
    products: Signal<unknown[]>;
    filters: Signal<Record<string, unknown>>;
  };

  beforeEach(async () => {
    const filtersSignal = signal<Record<string, unknown>>({});
    store = {
      applyFilters: vi.fn((val) => filtersSignal.set(val)),
      removeFilter: vi.fn((key) => {
        const current = filtersSignal();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [key]: _, ...rest } = current;
        filtersSignal.set(rest);
      }),
      loadProducts: vi.fn(),
      loading: signal(false),
      products: signal([]),
      filters: filtersSignal,
    };

    await TestBed.configureTestingModule({
      imports: [FeatureFilters, getTranslocoTestingModule()],
      providers: [
        provideRouter([]),
        { provide: PRODUCT_LIST_STORE, useValue: store },
        {
          provide: PRODUCT_FILTER_CONFIG,
          useValue: [
            {
              key: 'name_like',
              type: 'input',
              debounceTime: 0,
              initialValue: '',
            },
            {
              key: 'kind',
              type: 'radio',
              options: [
                { value: 'dog', text: 'dog' },
                { value: 'cat', text: 'cat' },
              ],
              debounceTime: 0,
              initialValue: '',
            },
            {
              key: 'status',
              type: 'dropdown',
              options: [
                { value: 'active', text: 'Active' },
                { value: 'inactive', text: 'Inactive' },
              ],
              debounceTime: 0,
              initialValue: '',
            },
          ],
        },
        {
          provide: PRODUCT_TOKEN,
          useValue: {
            getProducts: () => of({ products: [], pagination: {} }),
            getDetails: () => of({}),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureFilters);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create form controls based on filterConfigs', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tree = component.formTree as Record<string, any>;
    expect(tree['name_like']).toBeDefined();
    expect(tree['kind']).toBeDefined();
    expect(tree['status']).toBeDefined();

    expect(component.filterConfigs().length).toBe(3);
  });

  it('should return form field using getFormField', () => {
    const field = component.getFormField('status');
    expect(field).toBeDefined();
  });

  it('should call applyFilters when kind filter changes', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tree = component.formTree as Record<string, any>;
    tree['kind']().value.set('dog');
    fixture.detectChanges();

    expect(store.applyFilters).toHaveBeenCalledWith({
      kind: 'dog',
      name_like: '',
      status: '',
    });
  });

  it('should reset dropdown filter and update store', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tree = component.formTree as Record<string, any>;
    tree['status']().value.set('active');
    fixture.detectChanges();

    component.resetFilter('status');
    fixture.detectChanges();

    expect(tree['status']().value()).toBe('');
    expect(store.removeFilter).toHaveBeenCalledWith('status');
  });

  it('should reset name filter and call removeFilter', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tree = component.formTree as Record<string, any>;
    tree['name_like']().value.set('test');

    component.resetFilter('name_like');
    fixture.detectChanges();

    expect(tree['name_like']().value()).toBe('');
    expect(store.removeFilter).toHaveBeenCalledWith('name_like');
  });

  it('should reset kind filter and call applyFilters + removeFilter', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tree = component.formTree as Record<string, any>;
    tree['kind']().value.set('dog');
    store.applyFilters.mockClear();

    component.resetFilter('kind');
    fixture.detectChanges();

    expect(tree['kind']().value()).toBe('');
    expect(store.removeFilter).toHaveBeenCalledWith('kind');

    expect(store.applyFilters).toHaveBeenCalledWith({
      kind: '',
      name_like: '',
      status: '',
    });
  });

  it('should return form values', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tree = component.formTree as Record<string, any>;
    tree['name_like']().value.set('test');
    tree['kind']().value.set('dog');
    tree['status']().value.set('active');

    expect(component.form()).toEqual({
      name_like: 'test',
      kind: 'dog',
      status: 'active',
    });
  });

  it('should not call loadProducts on initialization', () => {
    store.loadProducts.mockClear();
    fixture.detectChanges();
    expect(store.loadProducts).not.toHaveBeenCalled();
  });

  it('should call loadProducts when resetting a filter', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tree = component.formTree as Record<string, any>;
    tree['kind']().value.set('dog');
    fixture.detectChanges();
    store.loadProducts.mockClear();

    component.resetFilter('kind');
    fixture.detectChanges();

    expect(store.loadProducts).toHaveBeenCalledTimes(1);
  });
});
