import {
  provideEnvironmentInitializer,
  Provider,
  ErrorHandler,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import * as Sentry from '@sentry/angular';
import {
  ANALYTICS_TOKEN,
  IMonitoringService,
  MONITORING_TOKEN,
} from '@petsch/obs-api';
import { AnalyticsService } from './analytics/analytics.service';
import { SentryService } from './monitoring/sentry.service';

export const OBSERVABILITY_ENV_PROVIDERS = [
  provideEnvironmentInitializer(() => {
    const monitoring = inject<IMonitoringService>(MONITORING_TOKEN);
    inject(Sentry.TraceService);
    monitoring.init();
  }),
];

export const OBSERVABILITY_PROVIDERS: Provider[] = [
  {
    provide: ANALYTICS_TOKEN,
    useClass: AnalyticsService,
  },
  {
    provide: MONITORING_TOKEN,
    useClass: SentryService,
  },
  {
    provide: ErrorHandler,
    useValue: Sentry.createErrorHandler(),
  },
  {
    provide: Sentry.TraceService,
    deps: [Router],
  },
];
