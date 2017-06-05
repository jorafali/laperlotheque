import { TestBed, inject } from '@angular/core/testing';

import { EditSongControlService } from './edit-song-control.service';

describe('EditSongControlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditSongControlService]
    });
  });

  it('should ...', inject([EditSongControlService], (service: EditSongControlService) => {
    expect(service).toBeTruthy();
  }));
});
