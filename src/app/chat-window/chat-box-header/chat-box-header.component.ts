import { Component, OnInit } from '@angular/core';
import { OpenChatService } from 'src/app/open-chat.service';
import { Output, EventEmitter } from '@angular/core';
import { MessagesFlowService } from '../../messages-flow.service';

@Component({
  selector: 'app-chat-box-header',
  templateUrl: './chat-box-header.component.html',
  styleUrls: ['./chat-box-header.component.css'],
})
export class ChatBoxHeaderComponent implements OnInit {
  @Output() close = new EventEmitter<boolean>();
  @Output() restartRequest = new EventEmitter<boolean>();
  headerIcon: string =
    'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Flh3.googleusercontent.com%2FpE5dgP2JoUsdqmsqCVRmsUQutQ7FH80O4ajh_yH4LW2kj3W7vMmbe_-tpzduyy3tDA%3Dw300&f=1&nofb=1';
  constructor(
    private chat: OpenChatService,
    public messageService: MessagesFlowService
  ) {}

  ngOnInit(): void {}
  closeChat() {
    this.close.emit(this.chat.closeChatbox());
  }
  clearChat() {
    this.restartRequest.emit(true)
  }
}
