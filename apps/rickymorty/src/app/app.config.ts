import {
  ApplicationConfig,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
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

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideZonelessChangeDetection(),
    provideHttpClient(),
    {
      provide: PET_API_CONFIG,
      useValue: {
        baseUrl: 'https://rickandmortyapi.com/api/character',
        listRoute: '/rickymorty',
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
      provide: PET_DATA_TRANSFORMER,
      useValue: (item: Character) => ({
        ...item,
        photo_url: item.image,
        health:
          item.status === 'Alive'
            ? 'healthy'
            : item.status === 'Dead'
            ? 'unhealthy'
            : 'unknown',
      }),
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
