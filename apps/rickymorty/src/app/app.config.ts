import {
  ApplicationConfig,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import {
  PRODUCT_API_CONFIG,
  PRODUCT_TOKEN,
  PRODUCT_LIST_STORE,
  ITEMOFDAY_STORE,
  PRODUCT_DATA_TRANSFORMER,
} from '@petsch/api';
import { ProductApi } from '@petsch/data-access';
import { ProductsStore } from '@petsch/feature-pet-list';
import { ItemOfTheDayStore } from '@petsch/feature-pet-of-day';
import { PRODUCT_FILTER_CONFIG } from '@petsch/feature-filters';
import { Character, CharactersDto } from './models/character';
import { provideTransloco } from '@jsverse/transloco';
import { TranslocoHttpLoader } from './transloco-loader';
import { LOCALSTORAGE_TOKEN } from '@petsch/obs-api';
import { LocalstorageService } from '@petsch/obs-data-access';
import { characterAdapter } from './utils/character-adapter';
import { APP_ROUTES } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideZonelessChangeDetection(),
    provideHttpClient(),
    {
      provide: PRODUCT_API_CONFIG,
      useValue: {
        baseUrl: 'https://rickandmortyapi.com/api/character',
        listRoute: `/${APP_ROUTES.LIST}`,
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
      },
    },
    {
      provide: PRODUCT_DATA_TRANSFORMER,
      useValue: characterAdapter,
    },
    {
      provide: PRODUCT_TOKEN,
      useClass: ProductApi,
    },
    {
      provide: PRODUCT_LIST_STORE,
      useClass: ProductsStore,
    },
    {
      provide: ITEMOFDAY_STORE,
      useClass: ItemOfTheDayStore,
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
