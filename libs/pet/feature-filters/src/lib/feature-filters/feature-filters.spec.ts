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

  it('should reset kind filter and call removeFilter + loadProducts', () => {
    component.formTree.kind().value.set('dog');
    store.applyFilters.mockClear();

    component.resetFilter('kind');
    vi.runAllTimers();

    expect(component.formTree.kind().value()).toBe('');
    expect(store.removeFilter).toHaveBeenCalledWith('kind');
    expect(store.loadProducts).toHaveBeenCalled();
  });

  it('should return form values', () => {
    component.formTree.name_like().value.set('test');
    component.formTree.kind().value.set('dog');

    expect(component.form()).toEqual({
      name_like: 'test',
      kind: 'dog',
    });
  });

  it('should sync local form with store filters', () => {
    // Simulate store update
    store.filters.set({ name_like: 'corgi' });
    fixture.detectChanges();

    // Check if local form updated
    expect(component.form().name_like).toBe('corgi');
  });

  it('should not call loadProducts on initialization', () => {
    store.loadProducts.mockClear();
    vi.runAllTimers();
    expect(store.loadProducts).not.toHaveBeenCalled();
  });

  it('should NOT call loadProducts twice when user changes a filter', async () => {
    vi.useRealTimers();
    store.loadProducts.mockClear();
    store.applyFilters.mockImplementation((filters: any) => {
      // Simulate store updating its filters signal as a result of applyFilters
      store.filters.set(filters);
    });

    // Simulate user interaction
    component.formTree.kind().value.set('cat');
    fixture.detectChanges();

    // Allow any microtasks/effects to run
    await new Promise(resolve => setTimeout(resolve, 0));
    fixture.detectChanges();

    // Wait for debounceTime (config has 500 for kind)
    await new Promise(resolve => setTimeout(resolve, 600));

    // It should only be called once.
    expect(store.loadProducts).toHaveBeenCalledTimes(1);

    // Further ticks should not cause more calls
    await new Promise(resolve => setTimeout(resolve, 600));
    expect(store.loadProducts).toHaveBeenCalledTimes(1);

    vi.useFakeTimers();
  });

  it('should NOT call loadProducts when syncing from store (unidirectional)', async () => {
    vi.useRealTimers();
    store.loadProducts.mockClear();

    // Simulate store update (unrelated to local change)
    store.filters.set({ name_like: 'husky' });
    fixture.detectChanges();

    // Allow any microtasks/effects to run
    await new Promise(resolve => setTimeout(resolve, 0));
    fixture.detectChanges();

    // Check if local form updated
    expect(component.form().name_like).toBe('husky');

    // Wait for potential debounce triggers
    await new Promise(resolve => setTimeout(resolve, 600));

    // loadProducts should NOT be called by the filter component when syncing from store
    expect(store.loadProducts).not.toHaveBeenCalled();

    vi.useFakeTimers();
  });

  it('should NOT call loadProducts twice when two instances exist and one changes', async () => {
    vi.useRealTimers();

    // Create a second instance
    const fixture2 = TestBed.createComponent(FeatureFilters);
    fixture2.detectChanges();

    store.loadProducts.mockClear();
    store.applyFilters.mockImplementation((filters: any) => {
      store.filters.set(filters);
    });

    // Simulate user interaction on instance 1
    component.formTree.kind().value.set('dog');
    fixture.detectChanges();

    // Allow instance 1 to emit and update store
    await new Promise(resolve => setTimeout(resolve, 600));
    fixture.detectChanges();

    // Now instance 2 should have synced via effect
    fixture2.detectChanges();
    // and should NOT have emitted via its own observable because its form matches store
    await new Promise(resolve => setTimeout(resolve, 600));

    // Only instance 1 should have called loadProducts
    expect(store.loadProducts).toHaveBeenCalledTimes(1);

    vi.useFakeTimers();
  });
});
