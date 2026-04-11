import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeaturePage } from './feature-page';

describe('FeaturePage', () => {
  let component: FeaturePage;
  let fixture: ComponentFixture<FeaturePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturePage],
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
