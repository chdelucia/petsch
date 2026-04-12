import { InjectionToken, Signal } from '@angular/core';
import { Pet } from './models/pet';
import { PetOfTheDayEntry } from './models/petofday';

export interface PetOfDayStoreContract {
  products: Signal<Pet[]>;
  isOpen: Signal<boolean>;
  entries: Signal<PetOfTheDayEntry[]>;
  sortedEntries: Signal<PetOfTheDayEntry[]>;
  isPetAddedToday: Signal<boolean[]>;
  addPet(pet: Pet): void;
  togglePoT(isOpen: boolean): void;
}

export const PETOFDAY_STORE = new InjectionToken<PetOfDayStoreContract>(
  'PETOFDAY_STORE',
);
