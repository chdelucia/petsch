import { getTranslocoTestingModule } from '@petsch/shared-utils';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FiltersComponent } from './filters.component';
import { PRODUCT_TOKEN } from '@petsch/api';
import { of } from 'rxjs';
import { ProductsStore } from '@petsch/data-access';
import { vi } from 'vitest';

describe('FiltersComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;
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
      imports: [getTranslocoTestingModule(), FiltersComponent],
      providers: [
        { provide: ProductsStore, useValue: store },
        {
          provide: PRODUCT_TOKEN,
          useValue: {
            getProducts: () => of({ products: [], pagination: {} }),
            getDetails: () => of({}),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltersComponent);
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

  it('should call updateFilters and loadProducts when kind filter changes, excluding name', () => {
    store.filtersApplied.mockReturnValue({ name: 'existing' });
    component.form.get('kind')?.setValue('dog');
    store.filtersApplied.mockReturnValue({ kind: 'dog' }); // Simulate updateFilters effect
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

  it('should return activeFilters excluding name', () => {
    component.form.get('name')?.setValue('test');
    component.form.get('kind')?.setValue('dog');
    expect(component.activeFilters).toEqual({ kind: 'dog' });
  });
});
