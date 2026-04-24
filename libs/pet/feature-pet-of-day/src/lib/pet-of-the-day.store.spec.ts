import { TestBed } from '@angular/core/testing';
import { ItemOfDayStore } from './pet-of-the-day.store';
import { LOCALSTORAGE_TOKEN } from '@petsch/obs-api';
import { patchState } from '@ngrx/signals';

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

  it('should toggle isOpen state', () => {
    store.toggleIotd(true);
    expect(store.isOpen()).toBe(true);
    store.toggleIotd(false);
    expect(store.isOpen()).toBe(false);
  });

  it('should remove an item by date', () => {
    const date = '2023-01-01';
    patchState(store, { entries: [{ product: { id: 1 }, date }] });
    store.removeItem(date);
    expect(store.entries().length).toBe(0);
    expect(storageMock.setValue).toHaveBeenCalledWith('item-of-the-day-entries', []);
  });

  it('should load entries from storage on init', () => {
    const savedEntries = [{ product: { id: 1 }, date: '2023-01-01' }];
    storageMock.getValue.mockReturnValue(savedEntries);

    // reset modules to trigger onInit
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        ItemOfDayStore,
        { provide: LOCALSTORAGE_TOKEN, useValue: storageMock },
      ],
    });

    const newStore = TestBed.inject(ItemOfDayStore);

    expect(newStore.entries()).toEqual(savedEntries);
  });

  it('should compute sortedEntries correctly', () => {
    const entries = [
      { product: { id: 1 }, date: '2023-01-01' },
      { product: { id: 2 }, date: '2023-01-03' },
      { product: { id: 3 }, date: '2023-01-02' },
    ];
    patchState(store, { entries });

    const sorted = store.sortedEntries();
    expect(sorted[0].date).toBe('2023-01-03');
    expect(sorted[1].date).toBe('2023-01-02');
    expect(sorted[2].date).toBe('2023-01-01');
  });

  it('should compute todayItem and isItemAddedToday correctly', () => {
    const today = new Date().toLocaleDateString('sv-SE');
    const product = { id: 1, name: 'Today Product' };

    expect(store.todayItem()).toBeNull();
    expect(store.isItemAddedToday()).toBe(false);

    store.addItem(product);

    expect(store.todayItem()).toEqual(product);
    expect(store.isItemAddedToday()).toBe(true);
  });
});
