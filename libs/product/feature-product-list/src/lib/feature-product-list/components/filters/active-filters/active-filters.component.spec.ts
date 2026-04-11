import { getTranslocoTestingModule } from '@petsch/shared-utils';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActiveFiltersComponent } from './active-filters.component';

describe('ActiveFiltersComponent', () => {
  let component: ActiveFiltersComponent;
  let fixture: ComponentFixture<ActiveFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [getTranslocoTestingModule(), ActiveFiltersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ActiveFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
