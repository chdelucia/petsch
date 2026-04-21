import { getTranslocoTestingModule } from '@petsch/shared-utils';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureProductList } from './feature-pet-list';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { PRODUCT_LIST_STORE, ITEM_OF_DAY_STORE, PRODUCT_TOKEN } from '@petsch/api';
import { LOCALSTORAGE_TOKEN, ANALYTICS_TOKEN } from '@petsch/obs-api';
import { signal } from '@angular/core';

describe('FeatureProductList', () => {
  let component: FeatureProductList;
  let fixture: ComponentFixture<FeatureProductList>;
  let store: any;

  beforeEach(async () => {
    store = {
      applyFilters: vi.fn(),
      clearProducts: vi.fn(),
      showFilters: signal(true),
      gridView: signal(true),
      products: signal([]),
      products: signal([]),
      loading: signal(false),
      error: signal(null),
      pagination: signal({}),
      filters: signal({}),
      loadProducts: vi.fn(),
      applyPagination: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [getTranslocoTestingModule(), FeatureProductList],
      providers: [
        { provide: PRODUCT_LIST_STORE, useValue: store },
        {
          provide: ANALYTICS_TOKEN,
          useValue: { trackAddToFavorites: vi.fn() },
        },
        provideRouter([]),
        {
          provide: LOCALSTORAGE_TOKEN,
          useValue: {
            getValue: vi.fn(),
            setValue: vi.fn(),
            clearValue: vi.fn(),
            clearAll: vi.fn(),
          },
        },
        {
          provide: PRODUCT_TOKEN,
          useValue: {
            getProducts: () => of({ products: [], pagination: {} }),
            getDetails: () => of({}),
          },
        },
        {
          provide: ITEM_OF_DAY_STORE,
          useValue: {
            entries: signal([]),
            isItemAddedToday: signal(false),
            addItem: vi.fn(),
            removeItem: vi.fn(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureProductList);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('showFilters', true);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call handlePageChange and call store.loadProducts', () => {
    store.filters.set({ name: 'test' });
    component.handlePageChange(2);
    expect(store.applyPagination).toHaveBeenCalledWith(2);
  });

  it('should call handleIotdClick, track event and call iotdStore.addItem if not added today', () => {
    const pet = { id: '1', name: 'Test Pet' } as any;
    const spy = vi.spyOn(component['iotdStore'], 'addItem');
    const analyticsSpy = vi.spyOn(component['analytics'], 'trackAddToFavorites');

    component.handleIotdClick(pet);

    expect(analyticsSpy).toHaveBeenCalledWith('1', 'Test Pet', 0);
    expect(spy).toHaveBeenCalledWith(pet);
  });

  it('should show pagination if products are present even if loading', () => {
    store.products.set([{ id: 1, name: 'Product 1' }]);
    store.products.set([{ id: 1, name: 'Product 1' }]);
    store.loading.set(true);
    fixture.detectChanges();

    const pagination = fixture.nativeElement.querySelector(
      'lib-ch-ui-pagination',
    );
    expect(pagination).toBeTruthy();
  });

  it('should hide pagination if no products and loading', () => {
    store.products.set([]);
    store.loading.set(true);
    fixture.detectChanges();

    const pagination = fixture.nativeElement.querySelector(
      'lib-ch-ui-pagination',
    );
    expect(pagination).toBeFalsy();
  });

  it('should show pagination if not loading even if no products (e.g. initial state or empty result)', () => {
    store.products.set([]);
    store.loading.set(false);
    fixture.detectChanges();

    const pagination = fixture.nativeElement.querySelector(
      'lib-ch-ui-pagination',
    );
    expect(pagination).toBeTruthy();
  });

  it('should display length/height/weight even if they are 0', () => {
    store.products.set([
      {
        id: 1,
        name: 'Pet 0',
        length: 0,
        height: 0,
        weight: 0,
        health: 'healthy',
        photo_url: 'http://example.com/photo.jpg',
      },
    ]);
    store.loading.set(false);
    fixture.detectChanges();

    const content = fixture.nativeElement.textContent;
    expect(content).toContain('height: 0cm');
    expect(content).toContain('width: 0cm');
    expect(content).toContain('weight: 0g');
  });
});
