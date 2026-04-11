import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FiltersComponent } from './filters.component';
import { PRODUCT_TOKEN } from '@petsch/api';
import { of } from 'rxjs';
import { ProductsStore } from '@petsch/data-access';

describe('FiltersComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;
  let store: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltersComponent],
      providers: [
        ProductsStore,
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
    store = TestBed.inject(ProductsStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset filter', () => {
    component.form.get('name')?.setValue('test');
    component.resetFilter('name');
    expect(component.form.get('name')?.value).toBe('');
  });

  it('should count active filters correctly', () => {
    expect(component.countActiveFilters({ name: 'test' })).toBeTruthy();
    expect(component.countActiveFilters({ kind: 'dog' } as any)).toBeTruthy();
    expect(component.countActiveFilters({})).toBeFalsy();
  });

  it('should call store.loadProducts when form changes', () => {
    vi.useFakeTimers();
    const spy = vi.spyOn(store, 'loadProducts');
    component.form.patchValue({ name: 'new pet' });
    vi.advanceTimersByTime(300);
    expect(spy).toHaveBeenCalledWith(expect.objectContaining({ name: 'new pet' }));
    vi.useRealTimers();
  });
});
