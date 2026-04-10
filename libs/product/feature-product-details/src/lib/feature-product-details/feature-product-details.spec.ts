import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureProductDetails } from './feature-product-details';
import { PRODUCT_TOKEN } from '@petsch/api';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';

describe('FeatureProductDetails', () => {
  let component: FeatureProductDetails;
  let fixture: ComponentFixture<FeatureProductDetails>;
  const mockProduct = {
    id: '1',
    title: 'Test Product',
    price: 100,
    description: 'Test Description',
    images: ['test.jpg'],
    category: { name: 'Test Category' },
  };

  const mockProductService = {
    getDetails: vi.fn().mockReturnValue(of(mockProduct)),
    getProducts: vi.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureProductDetails],
      providers: [
        { provide: PRODUCT_TOKEN, useValue: mockProductService },
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureProductDetails);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('id', '1');
    fixture.componentRef.setInput('product', mockProduct);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
