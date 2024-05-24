import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistoryTrackingStepperPage } from './history-tracking-stepper.page';

describe('HistoryTrackingStepperPage', () => {
  let component: HistoryTrackingStepperPage;
  let fixture: ComponentFixture<HistoryTrackingStepperPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryTrackingStepperPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
