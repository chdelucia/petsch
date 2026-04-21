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
import { ItemOfDayState, ItemOfDayEntry } from '@petsch/api';
import { LOCALSTORAGE_TOKEN, ANALYTICS_TOKEN } from '@petsch/obs-api';

const STORAGE_KEY = 'item-of-the-day-entries';

const initialState: ItemOfDayState = {
  entries: [],
  isOpen: false,
};

export const ItemOfDayStore = signalStore(
  withState(initialState),
  withProps(() => ({
    storageService: inject(LOCALSTORAGE_TOKEN),
    analytics: inject(ANALYTICS_TOKEN),
  })),
  withComputed((store) => {
    return {
      sortedEntries: computed(() => {
        return [...store.entries()].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
      }),
      todayItem: computed(() => {
        const today = new Date().toISOString().split('T')[0];
        return (
          store.entries().find((entry) => entry.date === today)?.product ?? null
        );
      }),
      isItemAddedToday: computed(() => {
        const today = new Date().toISOString().split('T')[0];
        return store.entries().some((entry) => entry.date === today);
      }),
    };
  }),
  withMethods((store) => {
    const { storageService, analytics } = store;
    return {
      addItem(product: any) {
        const today = new Date().toISOString().split('T')[0];
        const alreadyExists = store
          .entries()
          .some((entry) => entry.date === today);

        if (!alreadyExists && product) {
          analytics.trackAddToCart(
            product.id?.toString() ?? '',
            product.name || 'Unknown',
            0,
          );
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
