import { getTranslocoTestingModule } from '@petsch/shared-utils';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureProductDetails } from './feature-product-details';
import { PRODUCT_TOKEN } from '@petsch/api';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';
import { LocalstorageService } from '@petsch/obs-data-access';

describe('FeatureProductDetails', () => {
  let component: FeatureProductDetails;
  let fixture: ComponentFixture<FeatureProductDetails>;
  const mockProduct = {
    id: 1,
    name: 'Test Product',
    photo_url: 'https://example.com/test.jpg',
    kind: 'dog',
    weight: 1000,
    height: 10,
    length: 10,
    description: 'Test Description',
  };

  const mockProductService = {
    getDetails: vi.fn().mockReturnValue(of(mockProduct)),
    getProducts: vi.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [getTranslocoTestingModule(), FeatureProductDetails],
      providers: [
        { provide: PRODUCT_TOKEN, useValue: mockProductService },
        provideRouter([]),
        LocalstorageService,
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
