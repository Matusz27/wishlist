import { TestBed } from '@angular/core/testing';

import { SteamCallService } from './steam-call.service';

describe('SteamCallService', () => {
  let service: SteamCallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SteamCallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
