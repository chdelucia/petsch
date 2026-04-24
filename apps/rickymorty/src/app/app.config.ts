import {
  ApplicationConfig,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import {
  PRODUCT_UI_CONFIG,
  PRODUCT_LIST_STORE,
  ITEM_OF_DAY_STORE,
  PRODUCT_DATA_TRANSFORMER,
} from '@petsch/api';
import { provideRickAndMortyProductApi } from '@petsch/api-rickymorty';
import { ProductsStore } from '@petsch/feature-pet-list';
import { ItemOfDayStore } from '@petsch/feature-pet-of-day';
import { PRODUCT_FILTER_CONFIG } from '@petsch/feature-filters';
import { provideTransloco } from '@jsverse/transloco';
import { TranslocoHttpLoader } from './transloco-loader';
import { LOCALSTORAGE_TOKEN } from '@petsch/obs-api';
import {
  LocalstorageService,
  OBSERVABILITY_PROVIDERS,
  OBSERVABILITY_ENV_PROVIDERS,
} from '@petsch/obs-data-access';
import { characterAdapter } from './utils/character-adapter';
import { APP_ROUTES } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withComponentInputBinding()),
    provideZonelessChangeDetection(),
    provideHttpClient(),
    {
      provide: PRODUCT_UI_CONFIG,
      useValue: {
        listRoute: `/${APP_ROUTES.PRODUCTS}`,
        paginationKeys: {
          page: 'page',
          limit: 'limit',
        },
        hideSort: true,
      },
    },
    {
      provide: PRODUCT_DATA_TRANSFORMER,
      useValue: characterAdapter,
    },
    provideRickAndMortyProductApi(),
    ...OBSERVABILITY_PROVIDERS,
    ...OBSERVABILITY_ENV_PROVIDERS,
    {
      provide: PRODUCT_LIST_STORE,
      useClass: ProductsStore,
    },
    {
      provide: ITEM_OF_DAY_STORE,
      useClass: ItemOfDayStore,
    },
    {
      provide: LOCALSTORAGE_TOKEN,
      useClass: LocalstorageService,
    },
    {
      provide: PRODUCT_FILTER_CONFIG,
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
          type: 'radio',
          options: [
            { value: 'human', text: 'human' },
            { value: 'humanoid', text: 'humanoid' },
            { value: 'alien', text: 'alien' },
            { value: 'disease', text: 'disease' },
            { value: 'cronenberg', text: 'cronenberg' },
            { value: 'poopybutthole', text: 'poopybutthole' },
            { value: 'mythological', text: 'mythological' },
            { value: 'robot', text: 'robot' },
            { value: 'animal', text: 'animal' },
            { value: 'unknown', text: 'unknown' },
          ],
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
