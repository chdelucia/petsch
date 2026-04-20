import { InjectionToken, Signal } from '@angular/core';
import { ItemOfDayEntry } from './models/petofday';

export interface ItemOfDayStoreContract<T = unknown> {
  isOpen: Signal<boolean>;
  entries: Signal<ItemOfDayEntry<T>[]>;
  sortedEntries: Signal<ItemOfDayEntry<T>[]>;
  isItemAddedToday: Signal<boolean>;
  todayItem: Signal<T | null>;
  addItem(product: T): void;
  removeItem(date: string): void;
  toggleIotd(isOpen: boolean): void;
}

export const ITEM_OF_DAY_STORE = new InjectionToken<ItemOfDayStoreContract>(
  'ITEM_OF_DAY_STORE',
);
