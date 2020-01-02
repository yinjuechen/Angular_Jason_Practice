import { TestBed } from '@angular/core/testing';

import { UsStatesService } from './us-states.service';

describe('UsStatesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsStatesService = TestBed.get(UsStatesService);
    expect(service).toBeTruthy();
  });
});
