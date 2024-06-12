import { TestBed } from '@angular/core/testing';

import { SwitchFontService } from './switch-font.service';

describe('SwitchFontService', () => {
  let service: SwitchFontService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwitchFontService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
