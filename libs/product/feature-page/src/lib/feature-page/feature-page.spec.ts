import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeaturePage } from './feature-page';
import { getTranslocoTestingModule } from '@petsch/shared-utils';
import { PRODUCT_TOKEN } from '@petsch/api';
import { LOCALSTORAGE_TOKEN } from '@petsch/obs-api';
import { of } from 'rxjs';

describe('FeaturePage', () => {
  let component: FeaturePage;
  let fixture: ComponentFixture<FeaturePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturePage, getTranslocoTestingModule()],
      providers: [
        {
          provide: PRODUCT_TOKEN,
          useValue: {
            getProducts: () => of({ products: [], pagination: {} }),
          },
        },
        {
          provide: LOCALSTORAGE_TOKEN,
          useValue: {
            getValue: () => null,
            setValue: () => null,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
