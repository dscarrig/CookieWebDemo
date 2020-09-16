import { TestBed } from '@angular/core/testing';

import { ItemMenuServiceService } from './item-menu-service.service';

describe('ItemMenuServiceService', () => {
  let service: ItemMenuServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemMenuServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
