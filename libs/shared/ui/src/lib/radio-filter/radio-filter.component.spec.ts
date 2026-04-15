import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChRadioFilter } from './radio-filter.component';

describe('ChRadioFilter', () => {
  let component: ChRadioFilter;
  let fixture: ComponentFixture<ChRadioFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChRadioFilter],
    }).compileComponents();

    fixture = TestBed.createComponent(ChRadioFilter);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('title', 'gender');
    fixture.componentRef.setInput('options', [{ value: 'dog', text: 'DOG' }]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle filter', () => {
    component.isOpen.set(true);
    component.togleFilter();
    expect(component.isOpen()).toBeFalsy();
    component.togleFilter();
    expect(component.isOpen()).toBeTruthy();
  });

  it('should set value and call onChange when getValue is called', () => {
    const spy = vi.fn();
    component.registerOnChange(spy);
    const event = {
      target: { value: 'dog' } as HTMLInputElement,
    } as unknown as Event;

    component.getValue(event);
    fixture.detectChanges();

    expect(component.value()).toBe('dog');
    expect(spy).toHaveBeenCalledWith('dog');
  });

  it('should handle writeValue', () => {
    component.writeValue('cat');
    expect(component.value()).toBe('cat');
  });

  it('should handle writeValue with null/undefined', () => {
    component.writeValue(null as unknown as string);
    expect(component.value()).toBe('');
  });

  it('should register onTouched', () => {
    const spy = vi.fn();
    component.registerOnTouched(spy);
    expect(component.onTouched).toBe(spy);
  });
});
