import { TestBed } from '@angular/core/testing';

import { SocieteEmettriceService } from './societe-emettrice.service';

describe('SocieteEmettriceService', () => {
  let service: SocieteEmettriceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocieteEmettriceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
