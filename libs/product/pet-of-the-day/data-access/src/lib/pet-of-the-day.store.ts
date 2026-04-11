import { computed, inject } from '@angular/core';
import { Pet } from '@petsch/api';
import { LocalstorageService } from '@petsch/obs-data-access';
import {
  signalStore,
  withComputed,
  withMethods,
  withState,
  withHooks,
  patchState,
} from '@ngrx/signals';

export interface PetOfTheDayEntry {
  pet: Pet;
  date: string; // ISO string for the day (e.g., '2023-10-27')
}

export interface PetOfTheDayState {
  entries: PetOfTheDayEntry[];
}

const STORAGE_KEY = 'pet-of-the-day-entries';

const initialState: PetOfTheDayState = {
  entries: [],
};

export const PetOfTheDayStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => {
    return {
      sortedEntries: computed(() => {
        return [...store.entries()].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      }),
      todayPet: computed(() => {
        const today = new Date().toISOString().split('T')[0];
        return (
          store.entries().find((entry) => entry.date === today)?.pet ?? null
        );
      }),
      isPetAddedToday: computed(() => {
        const today = new Date().toISOString().split('T')[0];
        return store.entries().some((entry) => entry.date === today);
      }),
    };
  }),
  withMethods((store) => {
    const storageService = inject(LocalstorageService);

    return {
      addPet(pet: Pet) {
        const today = new Date().toISOString().split('T')[0];
        const alreadyExists = store
          .entries()
          .some((entry) => entry.date === today);

        if (!alreadyExists) {
          const newEntries = [...store.entries(), { pet, date: today }];
          patchState(store, { entries: newEntries });
          storageService.setValue(STORAGE_KEY, newEntries);
        }
      },
      loadFromStorage() {
        const savedEntries = storageService.getValue<PetOfTheDayEntry[]>(STORAGE_KEY);
        if (savedEntries) {
          patchState(store, { entries: savedEntries });
        }
      },
    };
  }),
  withHooks({
    onInit(store) {
      store.loadFromStorage();
    },
  })
);
