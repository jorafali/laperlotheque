/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PlaylistControlService } from './playlist-control.service';

describe('Service: PlaylistControl', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlaylistControlService]
    });
  });

  it('should ...', inject([PlaylistControlService], (service: PlaylistControlService) => {
    expect(service).toBeTruthy();
  }));
});
