import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatConvPage } from './chat-conv.page';

describe('ChatConvPage', () => {
  let component: ChatConvPage;
  let fixture: ComponentFixture<ChatConvPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatConvPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
