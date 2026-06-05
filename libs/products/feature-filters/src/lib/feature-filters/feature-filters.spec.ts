import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureFilters, PRODUCT_FILTER_CONFIG, FilterConfig } from './feature-filters';
import { PRODUCT_LIST_STORE, PRODUCT_TOKEN } from '@petsch/api';
import { getTranslocoTestingModule } from '@petsch/shared-utils';
import { of } from 'rxjs';
import { signal } from '@angular/core';

const TEST_FILTER_CONFIG: FilterConfig[] = [
  {
    key: 'name_like',
    type: 'input',
    debounceTime: 200,
    initialValue: '',
  },
  {
    key: 'kind',
    type: 'radio',
    options: [
      { value: 'dog', text: 'dog' },
      { value: 'cat', text: 'cat' },
    ],
    debounceTime: 500,
    initialValue: '',
  },
];

describe('FeatureFilters', () => {
  let component: FeatureFilters;
  let fixture: ComponentFixture<FeatureFilters>;
  let store: {
    applyFilters: any;
    removeFilter: any;
    loadProducts: any;
    loading: any;
    products: any;
  };

  beforeEach(async () => {
    vi.useFakeTimers();

    store = {
      applyFilters: vi.fn(),
      removeFilter: vi.fn(),
      loadProducts: vi.fn(),
      loading: signal(false),
      products: signal([]),
    };

    await TestBed.configureTestingModule({
      imports: [FeatureFilters, getTranslocoTestingModule()],
      providers: [
        { provide: PRODUCT_LIST_STORE, useValue: store },
        { provide: PRODUCT_FILTER_CONFIG, useValue: TEST_FILTER_CONFIG },
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

  it('should not call loadProducts on initialization', () => {
    store.loadProducts.mockClear();
    vi.runAllTimers();
    expect(store.loadProducts).not.toHaveBeenCalled();
  });

  it('should not call loadProducts manually when resetting a filter', () => {
    // Set a value first
    component.formTree.kind().value.set('dog');
    fixture.detectChanges();
    vi.runAllTimers();
    store.loadProducts.mockClear();

    // Reset the filter
    component.resetFilter('kind');
    fixture.detectChanges();
    vi.runAllTimers();

    expect(store.loadProducts).not.toHaveBeenCalled();
  });
});
