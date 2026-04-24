import {
  ApplicationConfig,
  inject,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
  isDevMode,
} from '@angular/core';
import {
  provideRouter,
  withInMemoryScrolling,
  withComponentInputBinding,
  withViewTransitions,
  ViewTransitionInfo,
} from '@angular/router';
import { appRoutes } from './app.routes';
import {
  OBSERVABILITY_PROVIDERS,
  OBSERVABILITY_ENV_PROVIDERS,
  LocalstorageService,
} from '@petsch/obs-data-access';
import {
  CurrentTransitionService,
  PRODUCT_UI_CONFIG,
  PRODUCT_DATA_TRANSFORMER,
  PRODUCT_LIST_STORE,
  ITEM_OF_DAY_STORE,
} from '@petsch/api';
import { enrichProductWithHealth } from './utils/health-adapter';
import { provideProductShopApi } from '@petsch/api-petshop';
import { ProductsStore } from '@petsch/feature-pet-list';
import { ItemOfDayStore } from '@petsch/feature-pet-of-day';
import { LOCALSTORAGE_TOKEN } from '@petsch/obs-api';
import { provideHttpClient } from '@angular/common/http';
import { TranslocoHttpLoader } from './transloco-loader';
import { provideTransloco } from '@jsverse/transloco';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      appRoutes,
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
      withComponentInputBinding(),
      withViewTransitions({ onViewTransitionCreated }),
    ),
    provideZonelessChangeDetection(),
    ...OBSERVABILITY_PROVIDERS,
    ...OBSERVABILITY_ENV_PROVIDERS,
    {
      provide: PRODUCT_UI_CONFIG,
      useValue: {
        listRoute: '/pets',
      },
    },
    {
      provide: PRODUCT_DATA_TRANSFORMER,
      useValue: enrichProductWithHealth,
    },
    provideProductShopApi(),
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
    provideHttpClient(),
    provideTransloco({
      config: {
        availableLangs: ['en', 'es'],
        defaultLang: 'en',
        // Remove this option if your application doesn't support changing language in runtime.
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
  ],
};

function onViewTransitionCreated(info: ViewTransitionInfo) {
  const currentTransitionService = inject(CurrentTransitionService);
  currentTransitionService.currentTransition.set(info);
  info.transition.finished.finally(() => {
    currentTransitionService.currentTransition.set(null);
  });
}
