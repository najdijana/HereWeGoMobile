import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransportationsPage } from './transportations.page';

describe('TransportationsPage', () => {
  let component: TransportationsPage;
  let fixture: ComponentFixture<TransportationsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
