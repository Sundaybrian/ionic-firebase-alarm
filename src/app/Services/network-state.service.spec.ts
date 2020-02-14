import { TestBed } from '@angular/core/testing';

import { NetworkStateService } from './network-state.service';

describe('NetworkStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NetworkStateService = TestBed.get(NetworkStateService);
    expect(service).toBeTruthy();
  });
});
