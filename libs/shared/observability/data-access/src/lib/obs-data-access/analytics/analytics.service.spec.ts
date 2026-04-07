import { TestBed } from '@angular/core/testing';
import { Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { AnalyticsService } from './analytics.service';

describe('AnalyticsService', () => {
  let service: AnalyticsService;
  let routerEvents: Subject<any>;
  let routerMock: any;

  beforeEach(() => {
    routerEvents = new Subject<any>();
    routerMock = {
      events: routerEvents.asObservable(),
    };

    (globalThis as any).gtag = vitest.fn();

    TestBed.configureTestingModule({
      providers: [AnalyticsService, { provide: Router, useValue: routerMock }],
    });

    service = TestBed.inject(AnalyticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should track page views on NavigationEnd', () => {
    const event = new NavigationEnd(1, '/test', '/test');
    routerEvents.next(event);

    expect(globalThis.gtag).toHaveBeenCalledWith(
      'event',
      'page_view',
      expect.objectContaining({
        page_path: '/test',
      }),
    );
  });

  it('should send custom event', () => {
    service.sendEvent('custom_event', { foo: 'bar' });
    expect(globalThis.gtag).toHaveBeenCalledWith('event', 'custom_event', {
      foo: 'bar',
    });
  });

  it('should track achievement unlocked', () => {
    service.trackCart('ach_1', 'First Achievement', 99);
    expect(globalThis.gtag).toHaveBeenCalledWith(
      'event',
      'add_to_cart',
      expect.objectContaining({
        item_id: 'ach_1',
        item_name: 'First Achievement',
      }),
    );
  });
});
