import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GuiderPage } from './guider.page';

describe('GuiderPage', () => {
  let component: GuiderPage;
  let fixture: ComponentFixture<GuiderPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GuiderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
