import { TestBed } from '@angular/core/testing';

import { GeotoolsService } from './geotools.service';

describe('GeotoolsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeotoolsService = TestBed.get(GeotoolsService);
    expect(service).toBeTruthy();
  });
});
