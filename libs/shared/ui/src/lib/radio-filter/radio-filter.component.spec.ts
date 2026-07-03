import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChRadioFilter } from './radio-filter.component';
import { By } from '@angular/platform-browser';

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
    fixture.componentRef.setInput('options', [
      { value: 'dog', text: 'DOG' },
      { value: 'cat', text: 'CAT' }
    ]);
    fixture.componentRef.setInput('testId', 'radio-filter');
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

  it('should set value when getValue is called', () => {
    const event = {
      target: { value: 'dog' } as HTMLInputElement,
    } as unknown as Event;

    component.getValue(event);

    expect(component.value()).toBe('dog');
  });

  it('should update value', () => {
    component.value.set('cat');
    expect(component.value()).toBe('cat');
  });

  it('should handle radio option click', () => {
    const radioOption = fixture.debugElement.query(By.css('[data-testid="radio-filter-option-dog"]'));

    radioOption.triggerEventHandler('click', { target: radioOption.nativeElement });

    expect(component.value()).toBe('dog');
  });

  it('should mark the correct radio option as checked', () => {
    component.value.set('cat');
    fixture.detectChanges();

    const dogRadio = fixture.debugElement.query(By.css('[data-testid="radio-filter-option-dog"]')).nativeElement as HTMLInputElement;
    const catRadio = fixture.debugElement.query(By.css('[data-testid="radio-filter-option-cat"]')).nativeElement as HTMLInputElement;

    expect(dogRadio.checked).toBe(false);
    expect(catRadio.checked).toBe(true);
  });
});
