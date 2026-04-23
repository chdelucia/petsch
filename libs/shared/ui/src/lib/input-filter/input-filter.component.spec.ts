import { getTranslocoTestingModule } from '@petsch/shared-utils';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChInputFilter } from './input-filter.component';

describe('ChInputFilter', () => {
  let component: ChInputFilter;
  let fixture: ComponentFixture<ChInputFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChInputFilter, getTranslocoTestingModule()],
    }).compileComponents();

    fixture = TestBed.createComponent(ChInputFilter);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('title', 'gender');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle filter', () => {
    component.isfilterOpen.set(true);
    component.toggleFilter();
    expect(component.isfilterOpen()).toBeFalsy();
    component.toggleFilter();
    expect(component.isfilterOpen()).toBeTruthy();
  });

  it('should write value', () => {
    component.writeValue('test');
    expect(component.value()).toBe('test');
    component.writeValue(null as unknown as string);
    expect(component.value()).toBe('');
  });

  it('should send value from input to searchText$', () => {
    const spy = vi.spyOn(component['searchText$'] as any, 'next');
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
    // should not add duplicate
    component.addSearch('test-search');
    expect(component.lastSearch().length).toBe(1);
    // should not add empty
    component.addSearch('');
    expect(component.lastSearch().length).toBe(1);
  });

  it('should limit lastSearch to 10 items', () => {
    for (let i = 0; i < 15; i++) {
      component.addSearch(`test-${i}`);
    }
    expect(component.lastSearch().length).toBe(10);
    expect(component.lastSearch()[0]).toBe('test-14');
  });

  it('should remove search from lastSearch', () => {
    component.lastSearch.set(['test1', 'test2']);
    const event = new MouseEvent('click');
    component.removeSearch(0, event);
    expect(component.lastSearch()).not.toContain('test1');
    expect(component.lastSearch()).toContain('test2');
  });

  it('should open last search if there are searches', () => {
    component.lastSearch.set(['test1']);
    component.openLastsearch();
    expect(component.isLastSearchOpen()).toBeTruthy();
  });

  it('should NOT open last search if there are NO searches', () => {
    component.lastSearch.set([]);
    component.openLastsearch();
    expect(component.isLastSearchOpen()).toBeFalsy();
  });

  it('should close last search', () => {
    component.isLastSearchOpen.set(true);
    component.closeLastSearch();
    expect(component.isLastSearchOpen()).toBeFalsy();
  });

  it('should search by old value', () => {
    const spy = vi.fn();
    component.registerOnChange(spy);
    component.value.set('old');
    component.searchByOldValue('new');
    expect(component.value()).toBe('new');
    expect(spy).toHaveBeenCalledWith('new');
    expect(component.isLastSearchOpen()).toBeFalsy();
  });

  it('should NOT search by old value if it is the same', () => {
    const spy = vi.fn();
    component.registerOnChange(spy);
    component.value.set('same');
    component.searchByOldValue('same');
    expect(spy).not.toHaveBeenCalled();
  });

  it('should handle document click to close last search', () => {
    component.isLastSearchOpen.set(true);
    document.dispatchEvent(new MouseEvent('click'));
    expect(component.isLastSearchOpen()).toBeFalsy();
  });

  it('should NOT close last search when clicking inside component', () => {
    component.isLastSearchOpen.set(true);
    fixture.nativeElement.dispatchEvent(
      new MouseEvent('click', { bubbles: true }),
    );
    expect(component.isLastSearchOpen()).toBeTruthy();
  });

  it('should handle searchText$ emission and updates', () => {
    vi.useFakeTimers();
    const onChangeSpy = vi.fn();
    component.registerOnChange(onChangeSpy);

    component.getValue({ target: { value: 'new-search' } } as any);

    vi.advanceTimersByTime(700);

    expect(component.lastSearch()).toContain('new-search');
    expect(onChangeSpy).toHaveBeenCalledWith('new-search');
    expect(component.isLastSearchOpen()).toBeFalsy();
    vi.useRealTimers();
  });

  it('should register onTouched', () => {
    const spy = vi.fn();
    component.registerOnTouched(spy);
    expect(component.onTouched).toBe(spy);
  });
});
