import { InjectionToken } from '@angular/core';

export interface IAnalyticsService {
  sendEvent(name: string, params?: Record<string, unknown>): void;
  trackCart(id: string, title: string, price: number): void;
}

export interface IMonitoringService {
  init(): void;
  captureException(error: unknown): void;
  captureMessage(message: string): void;
}

export const ANALYTICS_TOKEN = new InjectionToken<IAnalyticsService>(
  'ANALYTICS',
);
export const MONITORING_TOKEN = new InjectionToken<IMonitoringService>(
  'MONITORING',
);
