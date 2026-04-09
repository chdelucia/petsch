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
    fixture.componentRef.setInput('title', 'gender');
    fixture.componentRef.setInput('options', []);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle filter', () => {
    component.isOpen.set(true);
    component.togleFilter();
    expect(component.isOpen()).toBeFalsy();
  });
});
