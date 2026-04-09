import { TestBed } from '@angular/core/testing';

import { CurrentTransitionService } from './current-transition.service';

describe('CurrentTransitionService', () => {
  let service: CurrentTransitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentTransitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
