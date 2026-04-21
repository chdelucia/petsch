import { TestBed } from '@angular/core/testing';
import { ObservabilityFacade } from './observability.facade';
import { ANALYTICS_TOKEN } from '../analitic.token';
import { MONITORING_TOKEN } from '../monitoring.token';

describe('ObservabilityFacade', () => {
  let facade: ObservabilityFacade;
  let analyticsMock: any;
  let monitoringMock: any;

  beforeEach(() => {
    analyticsMock = {
      sendEvent: vi.fn(),
      trackAddToFavorites: vi.fn(),
    };
    monitoringMock = {
      captureException: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        ObservabilityFacade,
        { provide: ANALYTICS_TOKEN, useValue: analyticsMock },
        { provide: MONITORING_TOKEN, useValue: monitoringMock },
      ],
    });

    facade = TestBed.inject(ObservabilityFacade);
  });

  it('should call analytics.sendEvent when trackEvent is called', () => {
    facade.trackEvent('test', { key: 'val' });
    expect(analyticsMock.sendEvent).toHaveBeenCalledWith('test', { key: 'val' });
  });

  it('should call monitoring.captureException when trackError is called', () => {
    const error = new Error('test error');
    facade.trackError(error);
    expect(monitoringMock.captureException).toHaveBeenCalledWith(error);
  });

  it('should call analytics.trackAddToFavorites when trackAddToFavorites is called', () => {
    facade.trackAddToFavorites('1', 'title', 100);
    expect(analyticsMock.trackAddToFavorites).toHaveBeenCalledWith('1', 'title', 100);
  });

  it('should call trackEvent with purchase when trackPurchase is called', () => {
    facade.trackPurchase(500);
    expect(analyticsMock.sendEvent).toHaveBeenCalledWith('purchase', { total: 500 });
  });
});
