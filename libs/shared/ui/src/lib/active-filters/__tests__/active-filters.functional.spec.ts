import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChActiveFiltersComponent } from '../active-filters.component';
import { getTranslocoTestingModule } from '@petsch/shared-utils';
import { By } from '@angular/platform-browser';

describe('ChActiveFiltersComponent functional test', () => {
  let component: ChActiveFiltersComponent;
  let fixture: ComponentFixture<ChActiveFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [getTranslocoTestingModule(), ChActiveFiltersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChActiveFiltersComponent);
    component = fixture.componentInstance;
  });

  it('should display active filters and emit reset when removed', () => {
    // Set some filter values
    fixture.componentRef.setInput('values', {
      name_like: 'corgi',
      kind: 'dog',
      _page: 1, // should be ignored
    });
    fixture.componentRef.setInput('testId', 'test-filters');

    fixture.detectChanges();

    // Check if filters are displayed
    const filterItems = fixture.debugElement.queryAll(By.css('.ch-active-filters__item'));
    expect(filterItems.length).toBe(2);

    // Verify labels (transloco might return key if empty, but at least we check it's there)
    const texts = filterItems.map(item => item.nativeElement.textContent);
    expect(texts.some(t => t.includes('corgi'))).toBe(true);
    expect(texts.some(t => t.includes('dog'))).toBe(true);

    // Spy on resetFilter output
    const resetSpy = vi.spyOn(component.resetFilter, 'emit');

    // Click remove button for name_like
    const removeBtn = fixture.debugElement.query(By.css('[data-testid="test-filters-remove-name_like"]'));
    expect(removeBtn).toBeTruthy();
    removeBtn.nativeElement.click();

    expect(resetSpy).toHaveBeenCalledWith('name_like');
  });

  it('should not display anything if no relevant filters are active', () => {
    fixture.componentRef.setInput('values', {
      _page: 2,
      _limit: 12
    });
    fixture.detectChanges();

    const section = fixture.debugElement.query(By.css('.ch-active-filters'));
    expect(section).toBeFalsy();
  });
});
