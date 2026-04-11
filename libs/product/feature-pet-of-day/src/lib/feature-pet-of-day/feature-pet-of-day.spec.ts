import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeaturePetOfDay } from './feature-pet-of-day';

describe('FeaturePetOfDay', () => {
  let component: FeaturePetOfDay;
  let fixture: ComponentFixture<FeaturePetOfDay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturePetOfDay],
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturePetOfDay);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
