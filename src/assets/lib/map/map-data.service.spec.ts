import { TestBed, inject } from '@angular/core/testing';

import { MapDataService } from './map-data.service';

describe('MapDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapDataService]
    });
  });

  it('should ...', inject([MapDataService], (service: MapDataService) => {
    expect(service).toBeTruthy();
  }));
});
