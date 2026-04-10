import { InjectionToken } from '@angular/core';
import { IAnalyticsService } from './analytic.repository';

export const ANALYTICS_TOKEN = new InjectionToken<IAnalyticsService>(
  'ANALYTICS',
);
