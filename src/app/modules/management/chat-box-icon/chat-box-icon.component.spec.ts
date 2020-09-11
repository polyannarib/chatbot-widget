import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatBoxIconComponent } from './chat-box-icon.component';

describe('ChatBoxIconComponent', () => {
  let component: ChatBoxIconComponent;
  let fixture: ComponentFixture<ChatBoxIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatBoxIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatBoxIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
