import { TestBed } from '@angular/core/testing';
import { ItemOfDayStore } from './pet-of-the-day.store';
import { LOCALSTORAGE_TOKEN, ANALYTICS_TOKEN } from '@petsch/obs-api';

describe('ItemOfDayStore', () => {
  let store: any;
  let storageMock: any;
  let analyticsMock: any;

  beforeEach(() => {
    storageMock = {
      getValue: vi.fn(),
      setValue: vi.fn(),
    };
    analyticsMock = {
      trackAddToCart: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        ItemOfDayStore,
        { provide: LOCALSTORAGE_TOKEN, useValue: storageMock },
        { provide: ANALYTICS_TOKEN, useValue: analyticsMock },
      ],
    });

    store = TestBed.inject(ItemOfDayStore);
  });

  it('should track add to cart when adding a product', () => {
    const product = { id: 1, name: 'Test Product' };
    store.addItem(product);

    expect(analyticsMock.trackAddToCart).toHaveBeenCalledWith('1', 'Test Product', 0);
  });

  it('should use default values if product is missing id or name', () => {
    const product = { id: undefined, name: undefined };
    store.addItem(product);

    expect(analyticsMock.trackAddToCart).toHaveBeenCalledWith('', 'Unknown', 0);
  });

  it('should not track if product is null', () => {
    store.addItem(null);
    expect(analyticsMock.trackAddToCart).not.toHaveBeenCalled();
  });

  it('should not track if item already exists for today', () => {
    const product1 = { id: 1, name: 'Product 1' };
    const product2 = { id: 2, name: 'Product 2' };

    store.addItem(product1);
    expect(analyticsMock.trackAddToCart).toHaveBeenCalledTimes(1);

    store.addItem(product2);
    expect(analyticsMock.trackAddToCart).toHaveBeenCalledTimes(1);
  });
});
