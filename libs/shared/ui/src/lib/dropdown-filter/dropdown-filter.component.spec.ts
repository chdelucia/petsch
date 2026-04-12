import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChDropdownFilter } from './dropdown-filter.component';

describe('ChDropdownFilter', () => {
  let component: ChDropdownFilter;
  let fixture: ComponentFixture<ChDropdownFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChDropdownFilter],
    }).compileComponents();

    fixture = TestBed.createComponent(ChDropdownFilter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit value', () => {
    const spy = vi.spyOn(component.sortbyChange, 'emit');
    component.emitValue('gender');
    expect(spy).toHaveBeenCalledWith({ key: 'gender', order: '' });
  });
});
