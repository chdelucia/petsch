import { getTranslocoTestingModule } from '@petsch/shared-utils';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChRangeFilter } from './range-filter.component';

describe('ChRangeFilter', () => {
  let component: ChRangeFilter;
  let fixture: ComponentFixture<ChRangeFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChRangeFilter, getTranslocoTestingModule()],
    }).compileComponents();

    fixture = TestBed.createComponent(ChRangeFilter);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('title', 'weight');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle filter', () => {
    component.isOpen.set(true);
    component.toggleFilter();
    expect(component.isOpen()).toBeFalsy();
    component.toggleFilter();
    expect(component.isOpen()).toBeTruthy();
  });

  it('should write value', () => {
    component.writeValue({ min: 10, max: 20 });
    expect(component.value()).toEqual({ min: 10, max: 20 });
    component.writeValue(null as any);
    expect(component.value()).toEqual({ min: null, max: null });
  });

  it('should update min value', () => {
    const spy = vi.fn();
    component.registerOnChange(spy);
    const event = { target: { value: '15' } } as any;
    component.updateMin(event);
    expect(component.value().min).toBe(15);
    expect(spy).toHaveBeenCalledWith({ min: 15, max: null });
  });

  it('should update max value', () => {
    const spy = vi.fn();
    component.registerOnChange(spy);
    const event = { target: { value: '25' } } as any;
    component.updateMax(event);
    expect(component.value().max).toBe(25);
    expect(spy).toHaveBeenCalledWith({ min: null, max: 25 });
  });

  it('should handle empty input as null', () => {
    const spy = vi.fn();
    component.registerOnChange(spy);
    component.value.set({ min: 10, max: 20 });
    const event = { target: { value: '' } } as any;
    component.updateMin(event);
    expect(component.value().min).toBeNull();
    expect(spy).toHaveBeenCalledWith({ min: null, max: 20 });
  });
});
