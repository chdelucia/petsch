import {
  ApplicationConfig,
  ENVIRONMENT_INITIALIZER,
  EnvironmentInjector,
  inject,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection, isDevMode,
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
import { PRODUCT_TOKEN, CurrentTransitionService } from '@petsch/api';
import { ProductApi } from '@petsch/data-access';
import { LOCALSTORAGE_TOKEN } from '@petsch/obs-api';
import { provideHttpClient } from '@angular/common/http';
import { TranslocoHttpLoader } from './transloco-loader';
import { provideTransloco } from '@jsverse/transloco';

let appInjector: EnvironmentInjector;

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
      provide: PRODUCT_TOKEN,
      useClass: ProductApi,
    },
    {
      provide: LOCALSTORAGE_TOKEN,
      useClass: LocalstorageService,
    }, provideHttpClient(), provideTransloco({
        config: {
          availableLangs: ['en', 'es'],
          defaultLang: 'en',
          // Remove this option if your application doesn't support changing language in runtime.
          reRenderOnLangChange: true,
          prodMode: !isDevMode(),
        },
        loader: TranslocoHttpLoader
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
