import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageLocationDetectorPage } from './image-location-detector.page';

describe('ImageLocationDetectorPage', () => {
  let component: ImageLocationDetectorPage;
  let fixture: ComponentFixture<ImageLocationDetectorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageLocationDetectorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
