import { getTranslocoTestingModule } from '@petsch/shared-utils';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChCartDrawer } from './cart-drawer';

describe('ChCartDrawer', () => {
  let component: ChCartDrawer;
  let fixture: ComponentFixture<ChCartDrawer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [getTranslocoTestingModule(), ChCartDrawer],
    }).compileComponents();

    fixture = TestBed.createComponent(ChCartDrawer);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('titleLabel', 'pet of the day');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit openChange(false) when closeDrawer is called', () => {
    const spy = vi.spyOn(component.openChange, 'emit');
    component.closeDrawer();
    expect(spy).toHaveBeenCalledWith(false);
  });

  it('should have default position "right"', () => {
    expect(component.position()).toBe('right');
  });

  it('should apply correct classes based on position', () => {
    fixture.componentRef.setInput('position', 'left');
    fixture.detectChanges();
    const container = fixture.nativeElement.querySelector('.ch-cart-drawer-panel-container');
    const panel = fixture.nativeElement.querySelector('.ch-cart-drawer-panel');

    expect(container.classList.contains('ch-cart-drawer-panel-container--left')).toBe(true);
    expect(panel.classList.contains('ch-cart-drawer-panel--left')).toBe(true);

    fixture.componentRef.setInput('position', 'right');
    fixture.detectChanges();
    expect(container.classList.contains('ch-cart-drawer-panel-container--right')).toBe(true);
    expect(panel.classList.contains('ch-cart-drawer-panel--right')).toBe(true);
  });
});
