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
    component.togleFilter();
    expect(component.isfilterOpen()).toBeFalsy();
    component.togleFilter();
    expect(component.isfilterOpen()).toBeTruthy();
  });

  it('should update value', () => {
    component.value.set('test');
    expect(component.value()).toBe('test');
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
    component.value.set('old');
    component.searchByOldValue('new');
    expect(component.value()).toBe('new');
    expect(component.isLastSearchOpen()).toBeFalsy();
  });

  it('should NOT search by old value if it is the same', () => {
    component.value.set('same');
    component.searchByOldValue('same');
    expect(component.value()).toBe('same');
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

  it('should update component state when getValue is called', () => {
    const event = {
      target: { value: 'new-search' } as HTMLInputElement,
    } as unknown as Event;

    component.getValue(event);

    expect(component.lastSearch()).toContain('new-search');
    expect(component.value()).toBe('new-search');
  });
});
