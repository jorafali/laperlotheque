import { TestBed, inject } from '@angular/core/testing';

import { D3HexbinService } from './d3-hexbin.service';

describe('D3HexbinService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [D3HexbinService]
    });
  });

  it('should ...', inject([D3HexbinService], (service: D3HexbinService) => {
    expect(service).toBeTruthy();
  }));
});
