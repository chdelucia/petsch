import { getTranslocoTestingModule } from '@petsch/shared-utils';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChActiveFiltersComponent } from './active-filters.component';

describe('ChActiveFiltersComponent', () => {
  let component: ChActiveFiltersComponent;
  let fixture: ComponentFixture<ChActiveFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [getTranslocoTestingModule(), ChActiveFiltersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChActiveFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should compute items correctly', () => {
    fixture.componentRef.setInput('values', {
      name_like: 'John',
      age: 30,
      _hidden: 'secret',
      page: 1,
      price_gte: 10,
      price_lte: 100,
      empty: '',
    });
    fixture.detectChanges();

    const items = component.items();
    expect(items.length).toBe(2);
    expect(items).toContainEqual({ key: 'name_like', label: 'name', value: 'John' });
    expect(items).toContainEqual({ key: 'age', label: 'age', value: 30 });
  });

  it('should compute activeFilters correctly', () => {
    fixture.componentRef.setInput('values', {});
    fixture.detectChanges();
    expect(component.activeFilters()).toBe(false);

    fixture.componentRef.setInput('values', { name_like: 'John' });
    fixture.detectChanges();
    expect(component.activeFilters()).toBe(true);
  });

  it('should handle deleteFilter', () => {
    const spy = vi.spyOn(component.resetFilter, 'emit');
    component.deleteFilter('name_like');
    expect(spy).toHaveBeenCalledWith('name_like');
  });

  it('should handle null values in items computation', () => {
    fixture.componentRef.setInput('values', undefined);
    fixture.detectChanges();
    expect(component.items()).toEqual([]);
  });
});
