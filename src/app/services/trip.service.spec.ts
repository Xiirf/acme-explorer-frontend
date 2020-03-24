import { TestBed } from '@angular/core/testing';

import { TripService } from './trip.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('TripService', () => {
  let service: TripService;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [TripService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  }));

  beforeEach(() => {
    service = TestBed.inject(TripService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
