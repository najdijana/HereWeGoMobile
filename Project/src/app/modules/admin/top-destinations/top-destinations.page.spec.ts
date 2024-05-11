import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopDestinationsPage } from './top-destinations.page';

describe('TopDestinationsPage', () => {
  let component: TopDestinationsPage;
  let fixture: ComponentFixture<TopDestinationsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TopDestinationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
