import { TestBed } from '@angular/core/testing';

import { TimeslotService } from './timeslot.service';

describe('TimeslotService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TimeslotService = TestBed.get(TimeslotService);
    expect(service).toBeTruthy();
  });
});
