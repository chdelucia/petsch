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

  it('should create form controls dynamically based on filterConfigs', () => {
    expect(component.form.contains('name_like')).toBeTruthy();
    expect(component.form.contains('kind')).toBeTruthy();

    expect(component.filterConfigs().length).toBe(2);
  });

  it('should call applyFilters when kind filter changes', () => {
    component.form.get('kind')?.setValue('dog');
    vi.runAllTimers();

    expect(store.applyFilters).toHaveBeenCalledWith({ kind: 'dog' });
  });

  it('should reset name filter and call removeFilter', () => {
    component.form.get('name_like')?.setValue('test');

    component.resetFilter('name_like');
    vi.runAllTimers();

    expect(component.form.get('name_like')?.value).toBe('');
    expect(store.removeFilter).toHaveBeenCalledWith('name_like');

  });

  it('should reset kind filter and call applyFilters + removeFilter', () => {
    component.form.get('kind')?.setValue('dog');
    store.applyFilters.mockClear();

    component.resetFilter('kind');
    vi.runAllTimers();

    expect(component.form.get('kind')?.value).toBe('');
    expect(store.removeFilter).toHaveBeenCalledWith('kind');

    expect(store.applyFilters).toHaveBeenCalledWith({
      kind: '',
    });
  });

  it('should return activeFilters', () => {
    component.form.get('name_like')?.setValue('test');
    component.form.get('kind')?.setValue('dog');

    expect(component.activeFilters).toEqual({
      name_like: 'test',
      kind: 'dog',
    });
  });
});
