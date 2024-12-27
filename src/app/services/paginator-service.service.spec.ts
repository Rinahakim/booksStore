import { TestBed } from '@angular/core/testing';

import { PaginatorServiceService } from './paginator-service.service';

describe('PaginatorServiceService', () => {
  let service: PaginatorServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaginatorServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
