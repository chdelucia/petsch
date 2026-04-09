import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RadioFilterComponent } from './radio-filter.component';

describe('RadioFilterComponent', () => {
  let component: RadioFilterComponent;
  let fixture: ComponentFixture<RadioFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioFilterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RadioFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle filter', () => {
    component.isOpen = true;
    component.togleFilter();
    expect(component.isOpen).toBeFalsy();
  });
});
