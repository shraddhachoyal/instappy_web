import { TestBed } from '@angular/core/testing';

import { MyappsService } from './myapps.service';

describe('MyappsService', () => {
  let service: MyappsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyappsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
