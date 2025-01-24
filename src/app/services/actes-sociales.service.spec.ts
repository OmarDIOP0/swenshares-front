import { TestBed } from '@angular/core/testing';

import { ActesSocialesService } from './actes-sociales.service';

describe('ActesSocialesService', () => {
  let service: ActesSocialesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActesSocialesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
