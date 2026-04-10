import { beforeEach, describe, it, expect, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { SentryService } from './sentry.service';
import * as Sentry from '@sentry/angular';
import { isDevMode } from '@angular/core';

vi.mock('@sentry/angular', () => ({
  setTag: vi.fn(),
  captureException: vi.fn(),
}));

vi.mock('@angular/core', async () => {
  const actual = await vi.importActual('@angular/core');
  return {
    ...actual,
    isDevMode: vi.fn(),
  };
});

describe('SentryService', () => {
  let service: SentryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SentryService],
    });
    service = TestBed.inject(SentryService);
    vi.clearAllMocks();
  });

  it('should not set tag in development mode', () => {
    (isDevMode as unknown as vi.Mock).mockReturnValue(true);
    service.setTag('key', 'value');
    expect(Sentry.setTag).not.toHaveBeenCalled();
  });

  it('should set tag in production mode', () => {
    (isDevMode as unknown as vi.Mock).mockReturnValue(false);
    service.setTag('key', 'value');
    expect(Sentry.setTag).toHaveBeenCalledWith('key', 'value');
  });

  it('should not capture exception in development mode', () => {
    (isDevMode as unknown as vi.Mock).mockReturnValue(true);
    service.captureException(new Error('test'));
    expect(Sentry.captureException).not.toHaveBeenCalled();
  });

  it('should capture exception in production mode', () => {
    (isDevMode as unknown as vi.Mock).mockReturnValue(false);
    const error = new Error('test');
    service.captureException(error);
    expect(Sentry.captureException).toHaveBeenCalledWith(error);
  });
});
