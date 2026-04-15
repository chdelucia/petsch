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
    fixture.componentRef.setInput('name', 'Throwback Hip Bag');
    fixture.componentRef.setInput('description', 'Throwback Hip Bag desc');
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit remove when button is clicked', () => {
    const spy = vi.spyOn(component.remove, 'emit');
    const button = fixture.nativeElement.querySelector(
      '[data-testid="cart-item-remove"]',
    );
    button.click();
    expect(spy).toHaveBeenCalled();
  });

  it('should not show remove button if showRemove is false', async () => {
    fixture.componentRef.setInput('showRemove', false);
    await fixture.whenStable();
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector(
      '[data-testid="cart-item-remove"]',
    );
    expect(button).toBeNull();
  });
});
