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
    component.writeValue(50);
    expect(component.value()).toBe(50);
    component.writeValue(null);
    expect(component.value()).toBeNull();
  });

  it('should update value from slider', () => {
    const spy = vi.fn();
    component.registerOnChange(spy);
    const event = { target: { value: '75' } } as any;
    component.updateValue(event);
    expect(component.value()).toBe(75);
    expect(spy).toHaveBeenCalledWith(75);
  });

  it('should call onTouched on blur', () => {
    const spy = vi.fn();
    component.registerOnTouched(spy);
    component.onTouched();
    expect(spy).toHaveBeenCalled();
  });
});
