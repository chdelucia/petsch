import { getTranslocoTestingModule } from '@petsch/shared-utils';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeaturePetDetails } from './feature-pet-details';
import { PET_TOKEN } from '@petsch/api';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';
import { LocalstorageService } from '@petsch/obs-data-access';

describe('FeaturePetDetails', () => {
  let component: FeaturePetDetails;
  let fixture: ComponentFixture<FeaturePetDetails>;
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
    getPets: vi.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [getTranslocoTestingModule(), FeaturePetDetails],
      providers: [
        { provide: PET_TOKEN, useValue: mockProductService },
        provideRouter([]),
        LocalstorageService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturePetDetails);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('id', '1');
    fixture.componentRef.setInput('product', mockProduct);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
