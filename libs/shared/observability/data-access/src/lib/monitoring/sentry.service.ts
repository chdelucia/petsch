import { Injectable, isDevMode } from '@angular/core';
import * as Sentry from '@sentry/angular';

@Injectable()
export class SentryService {
  init(): void {
    Sentry.init({
      dsn: 'https://e7946b6fc90250816e0e2a0d8bd0811d@o4511065793036288.ingest.de.sentry.io/4511180369821776',
      sendDefaultPii: false,
      integrations: [
        Sentry.browserTracingIntegration(),
        Sentry.replayIntegration(),
      ],
      tracesSampleRate: 1,
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1,
    });
  }

  public setTag(key: string, value: string): void {
    if (isDevMode()) {
      return;
    }
    Sentry.setTag(key, value);
  }

  public captureException(exception: unknown): void {
    if (isDevMode()) {
      return;
    }
    Sentry.captureException(exception);
  }
}
