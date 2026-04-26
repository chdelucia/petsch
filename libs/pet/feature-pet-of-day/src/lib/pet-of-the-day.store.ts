import { computed, inject } from '@angular/core';
import { getLocalIsoDate } from '@petsch/shared-utils';
import {
  signalStore,
  withComputed,
  withMethods,
  withState,
  withHooks,
  patchState,
  withProps,
} from '@ngrx/signals';
import { ItemOfDayState, ItemOfDayEntry } from '@petsch/api';
import { LOCALSTORAGE_TOKEN } from '@petsch/obs-api';

const STORAGE_KEY = 'item-of-the-day-entries';

const initialState: ItemOfDayState = {
  entries: [],
  isOpen: false,
};

export const ItemOfDayStore = signalStore(
  withState(initialState),
  withProps(() => ({
    storageService: inject(LOCALSTORAGE_TOKEN),
  })),
  withComputed((store) => {
    return {
      sortedEntries: computed(() => {
        // Optimized sorting: comparing ISO date strings directly is faster than creating Date objects
        return [...store.entries()].sort((a, b) => {
          if (b.date > a.date) return 1;
          if (b.date < a.date) return -1;
          return 0;
        });
      }),
      todayItem: computed(() => {
        const today = getLocalIsoDate();
        return (
          store.entries().find((entry) => entry.date === today)?.product ?? null
        );
      }),
      isItemAddedToday: computed(() => {
        const today = getLocalIsoDate();
        return store.entries().some((entry) => entry.date === today);
      }),
    };
  }),
  withMethods((store) => {
    const { storageService } = store;
    return {
      addItem(product: unknown) {
        const today = getLocalIsoDate();
        const alreadyExists = store
          .entries()
          .some((entry) => entry.date === today);

        if (!alreadyExists) {
          const newEntries = [...store.entries(), { product, date: today }];
          patchState(store, { entries: newEntries, isOpen: true });
          storageService.setValue(STORAGE_KEY, newEntries);
        }
      },
      loadFromStorage() {
        const savedEntries =
          storageService.getValue<ItemOfDayEntry[]>(STORAGE_KEY);
        if (savedEntries) {
          patchState(store, { entries: savedEntries });
        }
      },
      removeItem(date: string) {
        const newEntries = store
          .entries()
          .filter((entry) => entry.date !== date);
        patchState(store, { entries: newEntries });
        storageService.setValue(STORAGE_KEY, newEntries);
      },
      toggleIotd(isOpen: boolean): void {
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
