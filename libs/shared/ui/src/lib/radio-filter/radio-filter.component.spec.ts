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

  it('should set value when getValue is called', () => {
    const event = {
      target: { value: 'dog' } as HTMLInputElement,
    } as unknown as Event;

    component.getValue(event);

    expect(component.value()).toBe('dog');
  });

  it('should handle value updates', () => {
    component.value.set('cat');
    expect(component.value()).toBe('cat');
  });
});
