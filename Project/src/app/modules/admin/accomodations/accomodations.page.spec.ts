import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccomodationsPage } from './accomodations.page';

describe('AccomodationsPage', () => {
  let component: AccomodationsPage;
  let fixture: ComponentFixture<AccomodationsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AccomodationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
