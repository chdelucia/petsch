import { TestBed } from '@angular/core/testing';
import { CurrentTransitionService } from './current-transition.service';
import { ViewTransitionInfo, ActivatedRouteSnapshot } from '@angular/router';

describe('CurrentTransitionService', () => {
  let service: CurrentTransitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentTransitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return "banner-img" when id is found in nested "to" snapshot', () => {
    const mockTo = {
      params: {},
      children: [
        {
          params: {},
          children: [
            {
              params: { id: '123' },
              children: [],
            },
          ],
        },
      ],
    } as unknown as ActivatedRouteSnapshot;

    service.currentTransition.set({
      to: mockTo,
      from: { params: {}, children: [] } as unknown as ActivatedRouteSnapshot,
    } as ViewTransitionInfo);

    expect(service.getViewTransitionName('123')).toBe('banner-img');
  });

  it('should return "banner-img" when id is found in nested "from" snapshot', () => {
    const mockFrom = {
      params: {},
      children: [
        {
          params: { id: '456' },
          children: [],
        },
      ],
    } as unknown as ActivatedRouteSnapshot;

    service.currentTransition.set({
      to: { params: {}, children: [] } as unknown as ActivatedRouteSnapshot,
      from: mockFrom,
    } as ViewTransitionInfo);

    expect(service.getViewTransitionName(456)).toBe('banner-img');
  });

  it('should return empty string when id is not found', () => {
    service.currentTransition.set({
      to: {
        params: { id: '789' },
        children: [],
      } as unknown as ActivatedRouteSnapshot,
      from: { params: {}, children: [] } as unknown as ActivatedRouteSnapshot,
    } as ViewTransitionInfo);

    expect(service.getViewTransitionName('123')).toBe('');
  });

  it('should handle null transition', () => {
    service.currentTransition.set(null);
    expect(service.getViewTransitionName('123')).toBe('');
  });
});
