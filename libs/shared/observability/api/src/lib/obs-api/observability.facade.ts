import { Injectable, inject } from '@angular/core';
import { ANALYTICS_TOKEN } from '../analitic.token';
import { MONITORING_TOKEN } from '../monitoring.token';

@Injectable({ providedIn: 'root' })
export class ObservabilityFacade {
  private readonly analytics = inject(ANALYTICS_TOKEN);
  private readonly monitoring = inject(MONITORING_TOKEN);

  trackEvent(name: string, params?: Record<string, unknown>) {
    this.analytics.sendEvent(name, params);
  }

  trackError(error: unknown) {
    this.monitoring.captureException(error);
  }

  trackAddToFavorites(id: string, title: string, price: number): void {
    this.analytics.trackAddToFavorites(id, title, price);
  }

  trackPurchase(total: number) {
    this.trackEvent('purchase', { total });
  }
}
