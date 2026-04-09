import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputFilterComponent } from './input-filter.component';

describe('InputFilterComponent', () => {
  let component: InputFilterComponent;
  let fixture: ComponentFixture<InputFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputFilterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle filter', () => {
    component.isfilterOpen = true;
    component.togleFilter();
    expect(component.isfilterOpen).toBeFalsy();
  });

  it('should write value', () => {
    component.writeValue('test');
    expect(component.value).toBe('test');
  });

  it('should send value from input to onChange', () => {
    const spy = jest.spyOn(component['searchText$'], 'next');
    const value = {
      target: { value: 'input-value-test' },
    } as Partial<HTMLInputElement>;
    component.getValue(value as Event);
    expect(spy).toHaveBeenCalledWith('input-value-test');
  });
});
