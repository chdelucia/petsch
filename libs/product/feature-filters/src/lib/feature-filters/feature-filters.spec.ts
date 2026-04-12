import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureFilters } from './feature-filters';
import { PETLIST_STORE, PRODUCT_TOKEN } from '@petsch/api';
import { getTranslocoTestingModule } from '@petsch/shared-utils';
import { of } from 'rxjs';

describe('FeatureFilters', () => {
  let component: FeatureFilters;
  let fixture: ComponentFixture<FeatureFilters>;
  let store: {
    updateFilters: any;
    loadProducts: any;
    removeFilter: any;
    filtersApplied: any;
    setFilterName: any;
  };

  beforeEach(async () => {
    vi.useFakeTimers();
    store = {
      updateFilters: vi.fn(),
      loadProducts: vi.fn(),
      removeFilter: vi.fn(),
      filtersApplied: vi.fn().mockReturnValue({}),
      setFilterName: vi.fn(),
    };
    await TestBed.configureTestingModule({
      imports: [FeatureFilters, getTranslocoTestingModule()],
      providers: [
        { provide: PETLIST_STORE, useValue: store },
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

  it('should create form controls dynamically based on filterConfigs', () => {
    expect(component.form.contains('name')).toBeTruthy();
    expect(component.form.contains('kind')).toBeTruthy();
    expect(component.filterConfigs.length).toBe(2);
  });

  it('should call setFilterName when name filter changes, but not loadProducts', () => {
    component.form.get('name')?.setValue('test');
    vi.runAllTimers();
    expect(store.setFilterName).toHaveBeenCalledWith('test');
    expect(store.loadProducts).not.toHaveBeenCalled();
  });

  it('should call updateFilters and loadProducts when kind filter changes', () => {
    store.filtersApplied.mockReturnValue({ name: 'existing' });
    component.form.get('kind')?.setValue('dog');
    store.filtersApplied.mockReturnValue({ name: 'existing', kind: 'dog' }); // Simulate updateFilters effect
    vi.runAllTimers();
    expect(store.updateFilters).toHaveBeenCalledWith({ kind: 'dog' });
    expect(store.loadProducts).toHaveBeenCalledWith({ kind: 'dog', _page: 1 });
  });

  it('should reset filter and call removeFilter, without extra loadProducts', () => {
    component.form.get('name')?.setValue('test');
    store.setFilterName.mockClear();
    store.loadProducts.mockClear();

    component.resetFilter('name');
    vi.runAllTimers();
    expect(component.form.get('name')?.value).toBe('');
    expect(store.removeFilter).toHaveBeenCalledWith('name');
    expect(store.setFilterName).toHaveBeenCalledWith('');
    expect(store.loadProducts).not.toHaveBeenCalled();
  });

  it('should reset kind filter and trigger loadProducts once', () => {
    component.form.get('kind')?.setValue('dog');
    store.updateFilters.mockClear();
    store.loadProducts.mockClear();

    component.resetFilter('kind');
    vi.runAllTimers();
    expect(component.form.get('kind')?.value).toBe('');
    expect(store.removeFilter).toHaveBeenCalledWith('kind');
    expect(store.updateFilters).toHaveBeenCalledWith({ kind: '' });
    expect(store.loadProducts).toHaveBeenCalledTimes(1);
    expect(store.loadProducts).toHaveBeenCalledWith({ _page: 1 });
  });

  it('should return activeFilters', () => {
    component.form.get('name')?.setValue('test');
    component.form.get('kind')?.setValue('dog');
    expect(component.activeFilters).toEqual({ name: 'test', kind: 'dog' });
  });
});
