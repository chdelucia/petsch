import {
  ApplicationConfig,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import {
  PET_API_CONFIG,
  PET_TOKEN,
  PETLIST_STORE,
  PETOFDAY_STORE,
  PET_DATA_TRANSFORMER,
} from '@petsch/api';
import { PetApi } from '@petsch/data-access';
import { PetsStore } from '@petsch/feature-pet-list';
import { PetOfTheDayStore } from '@petsch/feature-pet-of-day';
import { PET_FILTER_CONFIG } from '@petsch/feature-filters';
import { Character, CharactersDto } from './models/character';
import { provideTransloco } from '@jsverse/transloco';
import { TranslocoHttpLoader } from './transloco-loader';
import { LOCALSTORAGE_TOKEN } from '@petsch/obs-api';
import { LocalstorageService } from '@petsch/obs-data-access';
import { characterAdapter } from './utils/character-adapter';
import { APP_ROUTES } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withComponentInputBinding()),
    provideZonelessChangeDetection(),
    provideHttpClient(),
    {
      provide: PET_API_CONFIG,
      useValue: {
        baseUrl: 'https://rickandmortyapi.com/api/character',
        listRoute: `/${APP_ROUTES.PETS}`,
        getDetailsUrl: (id: string) =>
          `https://rickandmortyapi.com/api/character/${id}`,
        mapResponse: (response: HttpResponse<Character[] | unknown>) => {
          const body = response.body as CharactersDto;
          return {
            products: body.results,
            pagination: {
              pages: body.info.pages,
              next: body.info.next || undefined,
              prev: body.info.prev || undefined,
            },
          };
        },
        paginationKeys: {
          page: 'page',
          limit: 'limit',
        },
        hideSort: true,
      },
    },
    {
      provide: PET_DATA_TRANSFORMER,
      useValue: characterAdapter,
    },
    {
      provide: PET_TOKEN,
      useClass: PetApi,
    },
    {
      provide: PETLIST_STORE,
      useClass: PetsStore,
    },
    {
      provide: PETOFDAY_STORE,
      useClass: PetOfTheDayStore,
    },
    {
      provide: LOCALSTORAGE_TOKEN,
      useClass: LocalstorageService,
    },
    {
      provide: PET_FILTER_CONFIG,
      useValue: [
        {
          key: 'name',
          type: 'input',
          debounceTime: 300,
        },
        {
          key: 'status',
          type: 'radio',
          options: [
            { value: 'alive', text: 'Alive' },
            { value: 'dead', text: 'Dead' },
            { value: 'unknown', text: 'unknown' },
          ],
          debounceTime: 300,
        },
        {
          key: 'species',
          type: 'input',
          debounceTime: 300,
        },
        {
          key: 'type',
          type: 'input',
          debounceTime: 300,
        },
        {
          key: 'gender',
          type: 'radio',
          options: [
            { value: 'female', text: 'Female' },
            { value: 'male', text: 'Male' },
            { value: 'genderless', text: 'Genderless' },
            { value: 'unknown', text: 'unknown' },
          ],
          debounceTime: 300,
        },
      ],
    },
    provideTransloco({
      config: {
        availableLangs: ['en', 'es'],
        defaultLang: 'en',
        reRenderOnLangChange: true,
        prodMode: false,
      },
      loader: TranslocoHttpLoader,
    }),
  ],
};
