import { TestBed } from '@angular/core/testing';
import { ItemOfDayStore } from './pet-of-the-day.store';
import { LOCALSTORAGE_TOKEN } from '@petsch/obs-api';

describe('ItemOfDayStore', () => {
  let store: any;
  let storageMock: any;

  beforeEach(() => {
    storageMock = {
      getValue: vi.fn(),
      setValue: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        ItemOfDayStore,
        { provide: LOCALSTORAGE_TOKEN, useValue: storageMock },
      ],
    });

    store = TestBed.inject(ItemOfDayStore);
  });

  it('should be created', () => {
    expect(store).toBeTruthy();
  });

  it('should add an item if it does not exist for today', () => {
    const product = { id: 1, name: 'Test Product' };
    store.addItem(product);
    expect(store.entries().length).toBe(1);
    expect(storageMock.setValue).toHaveBeenCalled();
  });

  it('should not add an item if one already exists for today', () => {
    const product1 = { id: 1, name: 'Product 1' };
    const product2 = { id: 2, name: 'Product 2' };

    store.addItem(product1);
    store.addItem(product2);

    expect(store.entries().length).toBe(1);
    expect(store.entries()[0].product.name).toBe('Product 1');
  });

  it('should use local date (YYYY-MM-DD format) for entries', () => {
    const product = { id: 1, name: 'Local Product' };
    const localToday = new Date().toLocaleDateString('sv-SE');

    store.addItem(product);

    expect(store.entries()[0].date).toBe(localToday);
    // Ensure it's YYYY-MM-DD
    expect(store.entries()[0].date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});
