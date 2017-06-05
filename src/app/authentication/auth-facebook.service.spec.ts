import { TestBed, inject } from '@angular/core/testing';

import { AuthFacebookService } from './auth-facebook.service';

describe('AuthFacebookService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthFacebookService]
    });
  });

  it('should ...', inject([AuthFacebookService], (service: AuthFacebookService) => {
    expect(service).toBeTruthy();
  }));
});
