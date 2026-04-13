import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Pet, PET_TOKEN } from '@petsch/api';
import { ObservabilityFacade } from '@petsch/obs-api';
import { pipe, switchMap, tap } from 'rxjs';

export interface PetDetailsState {
  pet: Pet | null;
  loading: boolean;
  error: any | null;
}

const initialState: PetDetailsState = {
  pet: null,
  loading: false,
  error: null,
};

export const PetDetailsStore = signalStore(
  withState(initialState),
  withMethods(
    (
      store,
      petService = inject(PET_TOKEN),
      obsFacade = inject(ObservabilityFacade),
    ) => ({
      loadPet: rxMethod<string>(
        pipe(
          tap(() => patchState(store, { loading: true, error: null })),
          switchMap((id) =>
            petService.getDetails(id).pipe(
              tapResponse({
                next: (pet) => patchState(store, { pet, loading: false }),
                error: (error) => {
                  patchState(store, { error, loading: false, pet: null });
                  obsFacade.trackError(error);
                },
              }),
            ),
          ),
        ),
      ),
    }),
  ),
);
