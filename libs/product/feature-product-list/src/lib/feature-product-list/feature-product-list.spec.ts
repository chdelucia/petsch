import { getTranslocoTestingModule } from '@petsch/shared-utils';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureProductList } from './feature-product-list';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { PETLIST_STORE, PRODUCT_TOKEN } from '@petsch/api';
import { LocalstorageService } from '@petsch/obs-data-access';

describe('FeatureProductList', () => {
  let component: FeatureProductList;
  let fixture: ComponentFixture<FeatureProductList>;
  let store: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [getTranslocoTestingModule(), FeatureProductList],
      providers: [
        PETLIST_STORE,
        provideRouter([]),
        LocalstorageService,
        {
          provide: PRODUCT_TOKEN,
          useValue: {
            getProducts: () => of({ products: [], pagination: {} }),
            getDetails: () => of({}),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureProductList);
    component = fixture.componentInstance;
    store = TestBed.inject(PETLIST_STORE);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle filters', () => {
    expect(component.showFilters()).toBeTruthy();
    component.toggleFilters();
    expect(component.showFilters()).toBeFalsy();
  });

  it('should toggle view', () => {
    expect(component.gridView()).toBeTruthy();
    component.toggleView();
    expect(component.gridView()).toBeFalsy();
  });

  it('should call store.updateFilters when updateFilter is called', () => {
    const spy = vi.spyOn(store, 'updateFilters');
    component.updateFilter({ name: 'test' });
    expect(spy).toHaveBeenCalledWith({ name: 'test' });
  });

  it('should call store.clearProducts when clearFilters is called', () => {
    const spy = vi.spyOn(store, 'clearProducts');
    component.clearFilters();
    expect(spy).toHaveBeenCalled();
  });
});
