import { TestBed } from '@angular/core/testing';

import { ImageLocationService } from './image-location.service';

describe('ImageLocationService', () => {
  let service: ImageLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
