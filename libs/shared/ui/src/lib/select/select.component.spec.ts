import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectComponent } from './select.component';

describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('options', [
      { value: 5, label: '5' },
      { value: 10, label: '10' },
      { value: 20, label: '20' },
    ]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update value and call onChange when selection changes', () => {
    const onChangeSpy = vi.fn();
    component.registerOnChange(onChangeSpy);

    const select = fixture.nativeElement.querySelector('select');
    select.value = '10';
    select.dispatchEvent(new Event('change'));

    expect(component.value()).toBe(10);
    expect(onChangeSpy).toHaveBeenCalledWith(10);
  });

  it('should write value when writeValue is called', () => {
    component.writeValue(20);
    expect(component.value()).toBe(20);
  });

  it('should disable select when setDisabledState is called', () => {
    component.setDisabledState(true);
    fixture.detectChanges();
    const select = fixture.nativeElement.querySelector('select');
    expect(select.disabled).toBe(true);
  });
});
