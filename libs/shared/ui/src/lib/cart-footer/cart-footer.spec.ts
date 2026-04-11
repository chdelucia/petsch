import { getTranslocoTestingModule } from '@petsch/shared-utils';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartFooter } from './cart-footer';

describe('CartFooter', () => {
  let component: CartFooter;
  let fixture: ComponentFixture<CartFooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [getTranslocoTestingModule(), CartFooter],
    }).compileComponents();

    fixture = TestBed.createComponent(CartFooter);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('subtotal', 100);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
