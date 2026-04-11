import { getTranslocoTestingModule } from '@petsch/shared-utils';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartDrawer } from './cart-drawer';

describe('CartDrawer', () => {
  let component: CartDrawer;
  let fixture: ComponentFixture<CartDrawer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [getTranslocoTestingModule(), CartDrawer],
    }).compileComponents();

    fixture = TestBed.createComponent(CartDrawer);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('subtotal', 0);
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

  it('should emit checkoutClick when checkout is called', () => {
    const spy = vi.spyOn(component.checkoutClick, 'emit');
    component.checkout();
    expect(spy).toHaveBeenCalled();
  });
});
