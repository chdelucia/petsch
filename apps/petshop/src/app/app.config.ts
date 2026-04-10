import {
  ApplicationConfig,
  ENVIRONMENT_INITIALIZER,
  EnvironmentInjector,
  inject,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
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
    },
  ],
};

function onViewTransitionCreated(info: ViewTransitionInfo) {
  const currentTransitionService = inject(CurrentTransitionService);
  currentTransitionService.currentTransition.set(info);
  info.transition.finished.finally(() => {
    currentTransitionService.currentTransition.set(null);
  });
}
