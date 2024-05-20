import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrackingTripStepperPage } from './tracking-trip-stepper.page';

describe('TrackingTripStepperPage', () => {
  let component: TrackingTripStepperPage;
  let fixture: ComponentFixture<TrackingTripStepperPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackingTripStepperPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
