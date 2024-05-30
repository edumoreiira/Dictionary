import { TestBed } from '@angular/core/testing';

import { GetDictionaryService } from './get-dictionary.service';

describe('GetDictionaryService', () => {
  let service: GetDictionaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetDictionaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
