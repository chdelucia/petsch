import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureProductList } from './feature-product-list';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { PRODUCT_TOKEN } from '@petsch/api';

describe('FeatureProductList', () => {
  let component: FeatureProductList;
  let fixture: ComponentFixture<FeatureProductList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureProductList],
      providers: [
        provideRouter([]),
        {
          provide: PRODUCT_TOKEN,
          useValue: {
            getProducts: () => of([]),
            getDetails: () => of({}),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureProductList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
