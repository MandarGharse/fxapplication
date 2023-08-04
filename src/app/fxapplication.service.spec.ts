import { TestBed } from '@angular/core/testing';

import { FxapplicationService } from './fxapplication.service';

describe('FxapplicationService', () => {
  let service: FxapplicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FxapplicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
