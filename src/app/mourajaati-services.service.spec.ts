import { TestBed } from '@angular/core/testing';

import { MourajaatiServicesService } from './mourajaati-services.service';

describe('MourajaatiServicesService', () => {
  let service: MourajaatiServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MourajaatiServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
