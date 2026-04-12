import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChButton } from './button';

describe('ChButton', () => {
  let component: ChButton;
  let fixture: ComponentFixture<ChButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChButton],
    }).compileComponents();

    fixture = TestBed.createComponent(ChButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
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
