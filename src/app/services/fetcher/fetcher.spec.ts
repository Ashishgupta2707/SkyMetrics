import { TestBed } from '@angular/core/testing';

import { Fetcher } from './fetcher';

describe('Fetcher', () => {
  let service: Fetcher;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Fetcher);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
