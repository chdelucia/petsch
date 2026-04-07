import { Injectable, inject } from '@angular/core';
import { ANALYTICS_TOKEN, MONITORING_TOKEN } from './observability.interface';

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

  trackAddToCart(id: string, title: string, price: number): void {
    this.analytics.trackCart(id, title, price);
  }

  trackPurchase(total: number) {
    this.trackEvent('purchase', { total });
  }
}
