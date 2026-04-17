import { InjectionToken, Signal } from '@angular/core';
import { PetOfTheDayEntry } from './models/petofday';

export interface PetOfDayStoreContract<T = unknown> {
  isOpen: Signal<boolean>;
  entries: Signal<PetOfTheDayEntry<T>[]>;
  sortedEntries: Signal<PetOfTheDayEntry<T>[]>;
  isPetAddedToday: Signal<boolean>;
  todayPet: Signal<T | null>;
  addPet(pet: T): void;
  removePet(date: string): void;
  togglePoT(isOpen: boolean): void;
}

export const PETOFDAY_STORE = new InjectionToken<PetOfDayStoreContract>(
  'PETOFDAY_STORE',
);
