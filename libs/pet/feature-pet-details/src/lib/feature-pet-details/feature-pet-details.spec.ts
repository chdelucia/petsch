import { getTranslocoTestingModule } from '@petsch/shared-utils';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureProductDetails } from './feature-pet-details';
import { PRODUCT_TOKEN } from '@petsch/api';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';
import { LocalstorageService } from '@petsch/obs-data-access';
import {
  ANALYTICS_TOKEN,
  MONITORING_TOKEN,
  ObservabilityFacade,
} from '@petsch/obs-api';

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
    health: 'healthy',
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
        ObservabilityFacade,
        { provide: ANALYTICS_TOKEN, useValue: { trackEvent: vi.fn() } },
        { provide: MONITORING_TOKEN, useValue: { trackError: vi.fn() } },
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

  it('should display length/height/weight even if they are 0', () => {
    const productWithZeros = {
      ...mockProduct,
      height: 0,
      length: 0,
      weight: 0,
    };
    fixture.componentRef.setInput('product', productWithZeros);
    fixture.detectChanges();

    const content = fixture.nativeElement.textContent.toLowerCase();
    expect(content).toContain('height: 0 centimeters');
    expect(content).toContain('width: 0 centimeters');
    expect(content).toContain('weight: 0 grams');
  });
});
