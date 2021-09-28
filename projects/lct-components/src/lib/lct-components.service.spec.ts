import { TestBed } from '@angular/core/testing';

import { LctComponentsService } from './lct-components.service';

describe('LctComponentsService', () => {
  let service: LctComponentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LctComponentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
