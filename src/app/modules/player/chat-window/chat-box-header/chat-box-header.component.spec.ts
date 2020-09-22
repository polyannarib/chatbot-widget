import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatBoxHeaderComponent } from './chat-box-header.component';

describe('ChatBoxHeaderComponent', () => {
  let component: ChatBoxHeaderComponent;
  let fixture: ComponentFixture<ChatBoxHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatBoxHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatBoxHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
