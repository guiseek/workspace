import { inject, TestBed } from '@angular/core/testing';

import { IoFactoryService } from './io-factory.service';

describe('Service: IoFactory', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IoFactoryService],
    });
  });

  it('should ...', inject([IoFactoryService], (service: IoFactoryService) => {
    expect(service).toBeTruthy();
  }));
});
