import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChDropdownFilter } from './dropdown-filter.component';
import { getTranslocoTestingModule } from '@petsch/shared-utils';
import { By } from '@angular/platform-browser';

describe('ChDropdownFilter', () => {
  let component: ChDropdownFilter;
  let fixture: ComponentFixture<ChDropdownFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChDropdownFilter, getTranslocoTestingModule()],
    }).compileComponents();

    fixture = TestBed.createComponent(ChDropdownFilter);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('options', [
      { key: 'id', order: 'asc', text: 'Most Popular' },
      { key: 'name', order: 'asc', text: 'Name' },
    ]);
    fixture.componentRef.setInput('testId', 'dropdown');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit value', () => {
    const spy = vi.spyOn(component.sortbyChange, 'emit');
    const option = { key: 'gender', order: 'asc', text: 'Gender' };
    component.emitValue(option);
    expect(spy).toHaveBeenCalledWith({ key: 'gender', order: 'asc' });
  });

  it('should toggle the dropdown when toggle is called', () => {
    expect(component.isOpen()).toBe(false);
    component.toggle();
    expect(component.isOpen()).toBe(true);
    component.toggle();
    expect(component.isOpen()).toBe(false);
  });

  it('should emit sortbyChange when an option is clicked', () => {
    const spy = vi.spyOn(component.sortbyChange, 'emit');
    component.isOpen.set(true);
    fixture.detectChanges();

    const option = fixture.debugElement.query(By.css('[data-testid="dropdown-option-name-asc"]'));
    option.triggerEventHandler('click', null);

    expect(spy).toHaveBeenCalledWith({ key: 'name', order: 'asc' });
    expect(component.isOpen()).toBe(false);
  });

  it('should close the dropdown when clicking outside', () => {
    component.isOpen.set(true);
    fixture.detectChanges();

    document.dispatchEvent(new MouseEvent('click'));
    expect(component.isOpen()).toBe(false);
  });

  it('should NOT close the dropdown when clicking inside', () => {
    component.isOpen.set(true);
    fixture.detectChanges();

    fixture.nativeElement.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(component.isOpen()).toBe(true);
  });

  it('should return the first option by default', () => {
    expect(component.sortby()).toEqual({ key: 'id', order: 'asc', text: 'Most Popular' });
  });

  it('should return the selected option', () => {
    component.emitValue({ key: 'name', order: 'asc', text: 'Name' });
    expect(component.sortby()).toEqual({ key: 'name', order: 'asc', text: 'Name' });
  });
});
