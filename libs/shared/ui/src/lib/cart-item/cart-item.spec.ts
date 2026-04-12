import { getTranslocoTestingModule } from '@petsch/shared-utils';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChCartItem } from './cart-item';

describe('ChCartItem', () => {
  let component: ChCartItem;
  let fixture: ComponentFixture<ChCartItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [getTranslocoTestingModule(), ChCartItem],
    }).compileComponents();

    fixture = TestBed.createComponent(ChCartItem);
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
