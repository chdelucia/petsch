import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputFilterComponent } from './input-filter.component';

describe('InputFilterComponent', () => {
  let component: InputFilterComponent;
  let fixture: ComponentFixture<InputFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputFilterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputFilterComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('title', 'gender');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle filter', () => {
    component.isfilterOpen.set(true);
    component.togleFilter();
    expect(component.isfilterOpen()).toBeFalsy();
  });

  it('should write value', () => {
    component.writeValue('test');
    expect(component.value()).toBe('test');
  });

  it('should send value from input to searchText$', () => {
    const spy = vi.spyOn(component['searchText$'], 'next');
    const value = {
      target: { value: 'input-value-test' },
    } as Partial<HTMLInputElement>;
    component.getValue(value as Event);
    expect(component.value()).toBe('input-value-test');
    expect(spy).toHaveBeenCalledWith('input-value-test');
  });

  it('should add search to lastSearch', () => {
    component.addSearch('test-search');
    expect(component.lastSearch()).toContain('test-search');
  });

  it('should remove search from lastSearch', () => {
    component.lastSearch.set(['test1', 'test2']);
    const event = new MouseEvent('click');
    component.removeSearch(0, event);
    expect(component.lastSearch()).not.toContain('test1');
    expect(component.lastSearch()).toContain('test2');
  });
});
