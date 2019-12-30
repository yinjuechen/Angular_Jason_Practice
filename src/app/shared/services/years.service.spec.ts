import { TestBed } from '@angular/core/testing';

import { YearsService } from './years.service';

describe('YearsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: YearsService = TestBed.get(YearsService);
    expect(service).toBeTruthy();
  });
});
