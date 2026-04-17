import { computed, inject } from '@angular/core';
import {
  signalStore,
  withComputed,
  withMethods,
  withState,
  withHooks,
  patchState,
  withProps,
} from '@ngrx/signals';
import { PetOfTheDayState, PetOfTheDayEntry } from '@petsch/api';
import { LOCALSTORAGE_TOKEN } from '@petsch/obs-api';

const STORAGE_KEY = 'pet-of-the-day-entries';

const initialState: PetOfTheDayState = {
  entries: [],
  isOpen: false,
};

export const PetOfTheDayStore = signalStore(
  withState(initialState),
  withProps(() => ({
    storageService: inject(LOCALSTORAGE_TOKEN),
  })),
  withComputed((store) => {
    return {
      sortedEntries: computed(() => {
        return [...store.entries()].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
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
    const { storageService } = store;
    return {
      addPet(pet: any) {
        const today = new Date().toISOString().split('T')[0];
        const alreadyExists = store
          .entries()
          .some((entry) => entry.date === today);

        if (!alreadyExists) {
          const newEntries = [...store.entries(), { pet, date: today }];
          patchState(store, { entries: newEntries, isOpen: true });
          storageService.setValue(STORAGE_KEY, newEntries);
        }
      },
      loadFromStorage() {
        const savedEntries =
          storageService.getValue<PetOfTheDayEntry[]>(STORAGE_KEY);
        if (savedEntries) {
          patchState(store, { entries: savedEntries });
        }
      },
      removePet(date: string) {
        const newEntries = store
          .entries()
          .filter((entry) => entry.date !== date);
        patchState(store, { entries: newEntries });
        storageService.setValue(STORAGE_KEY, newEntries);
      },
      togglePoT(isOpen: boolean): void {
        patchState(store, { isOpen });
      },
    };
  }),
  withHooks({
    onInit(store) {
      store.loadFromStorage();
    },
  }),
);
