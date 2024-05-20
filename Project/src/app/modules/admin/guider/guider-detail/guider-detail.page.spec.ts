import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GuiderDetailPage } from './guider-detail.page';

describe('GuiderDetailPage', () => {
  let component: GuiderDetailPage;
  let fixture: ComponentFixture<GuiderDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GuiderDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
