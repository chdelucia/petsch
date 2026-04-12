import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureFilters } from './feature-filters';
import { PETLIST_STORE, PET_TOKEN } from '@petsch/api';
import { getTranslocoTestingModule } from '@petsch/shared-utils';
import { of } from 'rxjs';

describe('FeatureFilters', () => {
  let component: FeatureFilters;
  let fixture: ComponentFixture<FeatureFilters>;
  let store: {
    setFilterName: any;
    applyFilters: any;
    removeFilter: any;
    loadProducts: any;
  };

  beforeEach(async () => {
    vi.useFakeTimers();

    store = {
      setFilterName: vi.fn(),
      applyFilters: vi.fn(),
      removeFilter: vi.fn(),
      loadProducts: vi.fn(),
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
    expect(component.form.contains('name')).toBeTruthy();
    expect(component.form.contains('kind')).toBeTruthy();

    // ⚠️ computed signal -> hay que invocarlo
    expect(component.filterConfigs().length).toBe(2);
  });

  it('should call setFilterName when name filter changes', () => {
    component.form.get('name')?.setValue('test');
    vi.runAllTimers();

    expect(store.setFilterName).toHaveBeenCalledWith('test');
    expect(store.applyFilters).not.toHaveBeenCalled();
  });

  it('should call applyFilters when kind filter changes', () => {
    component.form.get('kind')?.setValue('dog');
    vi.runAllTimers();

    expect(store.applyFilters).toHaveBeenCalledWith({ kind: 'dog' });
  });

  it('should reset name filter and call removeFilter', () => {
    component.form.get('name')?.setValue('test');
    store.setFilterName.mockClear();

    component.resetFilter('name');
    vi.runAllTimers();

    expect(component.form.get('name')?.value).toBe('');
    expect(store.removeFilter).toHaveBeenCalledWith('name');
    expect(store.setFilterName).toHaveBeenCalledWith('');
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
    component.form.get('name')?.setValue('test');
    component.form.get('kind')?.setValue('dog');

    expect(component.activeFilters).toEqual({
      name: 'test',
      kind: 'dog',
    });
  });
});
