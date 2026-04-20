import {
  ApplicationConfig,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import {
  PET_UI_CONFIG,
  PETLIST_STORE,
  PETOFDAY_STORE,
  PET_DATA_TRANSFORMER,
} from '@petsch/api';
import { provideDragonBallPetApi } from '@petsch/api-dragonball';
import { PetsStore } from '@petsch/feature-pet-list';
import { PetOfTheDayStore } from '@petsch/feature-pet-of-day';
import { PET_FILTER_CONFIG } from '@petsch/feature-filters';
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
      provide: PET_UI_CONFIG,
      useValue: {
        listRoute: `/${APP_ROUTES.PETS}`,
        paginationKeys: {
          page: 'page',
          limit: 'limit',
        },
      },
    },
    {
      provide: PET_DATA_TRANSFORMER,
      useValue: characterAdapter,
    },
    provideDragonBallPetApi(),
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
          key: 'gender',
          type: 'radio',
          options: [
            { value: 'Male', text: 'Male' },
            { value: 'Female', text: 'Female' },
            { value: 'Unknown', text: 'Unknown' },
            { value: 'Other', text: 'Other' },
          ],
          debounceTime: 300,
        },
        {
            key: 'race',
            type: 'radio',
            options: [
              { value: 'Human', text: 'Human' },
              { value: 'Saiyan', text: 'Saiyan' },
              { value: 'Namekian', text: 'Namekian' },
              { value: 'Majin', text: 'Majin' },
              { value: 'Frieza Race', text: 'Frieza Race' },
              { value: 'Android', text: 'Android' },
              { value: 'Jiren Race', text: 'Jiren Race' },
              { value: 'God', text: 'God' },
              { value: 'Angel', text: 'Angel' },
              { value: 'Evil', text: 'Evil' },
              { value: 'Unknown', text: 'Unknown' },
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
