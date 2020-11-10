import { TestBed } from '@angular/core/testing';

import { CompodocService } from './compodoc.service';

describe('CompodocService', () => {
  let service: CompodocService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompodocService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
