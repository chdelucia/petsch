import { getTranslocoTestingModule } from '@petsch/shared-utils';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChActiveFiltersComponent } from './active-filters.component';

describe('ChActiveFiltersComponent', () => {
  let component: ChActiveFiltersComponent;
  let fixture: ComponentFixture<ChActiveFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [getTranslocoTestingModule(), ChActiveFiltersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChActiveFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
