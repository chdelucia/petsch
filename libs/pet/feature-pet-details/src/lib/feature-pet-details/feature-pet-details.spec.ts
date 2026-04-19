import { getTranslocoTestingModule } from '@petsch/shared-utils';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureproductDetails } from './feature-product-details';
import { PRODUCT_TOKEN } from '@petsch/api';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';
import { LocalstorageService } from '@petsch/obs-data-access';
import {
  ANALYTICS_TOKEN,
  MONITORING_TOKEN,
  ObservabilityFacade,
} from '@petsch/obs-api';

describe('FeatureproductDetails', () => {
  let component: FeatureproductDetails;
  let fixture: ComponentFixture<FeatureproductDetails>;
  const mockproduct = {
    id: 1,
    name: 'Test product',
    photo_url: 'https://example.com/test.jpg',
    kind: 'dog',
    weight: 1000,
    height: 10,
    length: 10,
    description: 'Test Description',
    health: 'healthy',
  };

  const mockproductService = {
    getDetails: vi.fn().mockReturnValue(of(mockproduct)),
    getProducts: vi.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [getTranslocoTestingModule(), FeatureproductDetails],
      providers: [
        { provide: PRODUCT_TOKEN, useValue: mockproductService },
        provideRouter([]),
        LocalstorageService,
        ObservabilityFacade,
        { provide: ANALYTICS_TOKEN, useValue: { trackEvent: vi.fn() } },
        { provide: MONITORING_TOKEN, useValue: { trackError: vi.fn() } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureproductDetails);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('id', '1');
    fixture.componentRef.setInput('product', mockproduct);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
