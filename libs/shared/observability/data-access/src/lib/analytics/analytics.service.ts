import { Injectable, isDevMode, inject } from '@angular/core';
import { IAnalyticsService } from '@petsch/obs-api';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

declare global {
  var dataLayer: Record<string, unknown>[];
  var gtag: (...args: unknown[]) => void;
}

@Injectable()
export class AnalyticsService implements IAnalyticsService {
  private readonly router = inject(Router);

  constructor() {
    this.trackPageViews();
  }

  private trackPageViews(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe((event: NavigationEnd) => {
        if (typeof gtag === 'function') {
          gtag('event', 'page_view', {
            page_path: event.urlAfterRedirects,
            page_location: globalThis.location.href,
            page_title: document.title,
          });
        }
      });
  }

  public sendEvent(eventName: string, params?: Record<string, unknown>): void {
    if (typeof gtag !== 'function') return;
    gtag('event', eventName, params || {});
  }

  public trackAddToCart(id: string, title: string, price: number): void {
    this.sendEvent('add_to_cart', {
      item_id: id,
      item_name: title,
      item_price: price,
      category: 'cart',
      debug_mode: isDevMode(),
    });
  }
}
