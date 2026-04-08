import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartItem } from './cart-item';

describe('CartItem', () => {
  let component: CartItem;
  let fixture: ComponentFixture<CartItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartItem],
    }).compileComponents();

    fixture = TestBed.createComponent(CartItem);
    component = fixture.componentInstance;
    fixture.componentRef.setInput(
      'imageSrc',
      'https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
    );
    fixture.componentRef.setInput(
      'imageAlt',
      'Salmon orange fabric pouch with match zipper',
    );
    fixture.componentRef.setInput('name', 'Throwback Hip Bag');
    fixture.componentRef.setInput('price', 90);
    fixture.componentRef.setInput('color', 'Salmon');
    fixture.componentRef.setInput('quantity', 1);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
