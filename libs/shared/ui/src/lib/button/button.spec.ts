import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Button } from './button';

describe('Button', () => {
  let component: Button;
  let fixture: ComponentFixture<Button>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Button],
    }).compileComponents();

    fixture = TestBed.createComponent(Button);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit clicked when handleClick is called and not disabled', () => {
    const spy = vi.spyOn(component.clicked, 'emit');
    fixture.componentRef.setInput('disabled', false);
    component.handleClick();
    expect(spy).toHaveBeenCalled();
  });

  it('should NOT emit clicked when handleClick is called and disabled', () => {
    const spy = vi.spyOn(component.clicked, 'emit');
    fixture.componentRef.setInput('disabled', true);
    component.handleClick();
    expect(spy).not.toHaveBeenCalled();
  });

  it('should have default values', () => {
    expect(component.variant()).toBe('primary');
    expect(component.fullWidth()).toBe(false);
    expect(component.disabled()).toBe(false);
  });
});
