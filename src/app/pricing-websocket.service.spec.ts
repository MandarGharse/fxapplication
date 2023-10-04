import { TestBed } from '@angular/core/testing';

import { PricingWebsocketService } from './pricing-websocket.service';

describe('PricingWebsocketService', () => {
  let service: PricingWebsocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PricingWebsocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
