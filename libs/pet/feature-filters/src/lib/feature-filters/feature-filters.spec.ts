import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureFilters } from './feature-filters';
import { PETLIST_STORE, PET_TOKEN } from '@petsch/api';
import { getTranslocoTestingModule } from '@petsch/shared-utils';
import { of } from 'rxjs';
import { signal } from '@angular/core';

describe('FeatureFilters', () => {
  let component: FeatureFilters;
  let fixture: ComponentFixture<FeatureFilters>;

  beforeEach(async () => {
    vi.useFakeTimers();

    await TestBed.configureTestingModule({
      imports: [FeatureFilters, getTranslocoTestingModule()],
      providers: [
        {
          provide: PET_TOKEN,
          useValue: {
            getPets: () => of({ products: [], pagination: {} }),
            getDetails: () => of({}),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureFilters);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create form controls based on filterConfigs', () => {
    expect(component.formTree.name_like).toBeDefined();
    expect(component.formTree.kind).toBeDefined();

    expect(component.filterConfigs().length).toBe(2);
  });

  it('should emit filterChange when kind filter changes', () => {
    const spy = vi.spyOn(component.filterChange, 'emit');
    component.formTree.kind().value.set('dog');
    vi.runAllTimers();

    expect(spy).toHaveBeenCalledWith({
      kind: 'dog',
      name_like: '',
    });
  });

  it('should reset name filter and emit filterChange', () => {
    const spy = vi.spyOn(component.filterChange, 'emit');
    component.formTree.name_like().value.set('test');
    vi.runAllTimers();
    spy.mockClear();

    component.resetFilter('name_like');
    vi.runAllTimers();

    expect(component.formTree.name_like().value()).toBe('');
    expect(spy).toHaveBeenCalledWith({
      kind: '',
      name_like: null,
    });
  });

  it('should reset kind filter and emit filterChange', () => {
    const spy = vi.spyOn(component.filterChange, 'emit');
    component.formTree.kind().value.set('dog');
    vi.runAllTimers();
    spy.mockClear();

    component.resetFilter('kind');
    vi.runAllTimers();

    expect(component.formTree.kind().value()).toBe('');
    expect(spy).toHaveBeenCalledWith({
      kind: null,
      name_like: '',
    });
  });

  it('should return form values', () => {
    component.formTree.name_like().value.set('test');
    component.formTree.kind().value.set('dog');

    expect(component.form()).toEqual({
      name_like: 'test',
      kind: 'dog',
    });
  });

  it('should not emit filterChange on initialization', () => {
    const spy = vi.spyOn(component.filterChange, 'emit');
    vi.runAllTimers();
    expect(spy).not.toHaveBeenCalled();
  });

  it('should only emit filterChange once when resetting a filter', () => {
    // Set a value first
    component.formTree.kind().value.set('dog');
    fixture.detectChanges();
    vi.runAllTimers();
    const spy = vi.spyOn(component.filterChange, 'emit');

    // Reset the filter
    component.resetFilter('kind');
    fixture.detectChanges();
    vi.runAllTimers();

    // filterReset is emitted immediately, but form change might also trigger filterChange
    // In our current implementation, resetFilter emits filterReset but also changes the form value
    // The form value change triggers the observable which emits filterChange.
    // This is expected.
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
