import { getTranslocoTestingModule } from '@petsch/shared-utils';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureCart } from './feature-cart';

describe('FeatureCart', () => {
  let component: FeatureCart;
  let fixture: ComponentFixture<FeatureCart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [getTranslocoTestingModule(), FeatureCart],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureCart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
