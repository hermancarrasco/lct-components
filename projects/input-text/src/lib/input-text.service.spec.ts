import { TestBed } from '@angular/core/testing';

import { InputTextService } from './input-text.service';

describe('InputTextService', () => {
  let service: InputTextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InputTextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
