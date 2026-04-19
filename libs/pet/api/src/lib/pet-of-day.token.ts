import { InjectionToken, Signal } from '@angular/core';
import { ItemOfTheDayEntry } from './models/petofday';

export interface ItemOfDayStoreContract<T = unknown> {
  isOpen: Signal<boolean>;
  entries: Signal<ItemOfTheDayEntry<T>[]>;
  sortedEntries: Signal<ItemOfTheDayEntry<T>[]>;
  isItemAddedToday: Signal<boolean>;
  todayItem: Signal<T | null>;
  addItem(product: T): void;
  removeItem(date: string): void;
  toggleIotd(isOpen: boolean): void;
}

export const ITEMOFDAY_STORE = new InjectionToken<ItemOfDayStoreContract>(
  'ITEMOFDAY_STORE',
);
