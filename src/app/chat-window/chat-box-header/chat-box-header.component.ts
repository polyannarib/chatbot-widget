import { Component, OnInit, Input } from '@angular/core';
import { OpenChatService } from '../../services/open-chat.service';
import { Output, EventEmitter } from '@angular/core';
import { MessagesFlowService } from '../../services/messages-flow.service';

@Component({
  selector: 'app-chat-box-header',
  templateUrl: './chat-box-header.component.html',
  styleUrls: ['./chat-box-header.component.css'],
})
export class ChatBoxHeaderComponent implements OnInit {
  @Output() close = new EventEmitter<boolean>();
  @Output() restartRequest = new EventEmitter<boolean>();
  minimizeOrMaximize: string = 'remove';
  mainColor: string;
  headerIcon: string =
    'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Flh3.googleusercontent.com%2FpE5dgP2JoUsdqmsqCVRmsUQutQ7FH80O4ajh_yH4LW2kj3W7vMmbe_-tpzduyy3tDA%3Dw300&f=1&nofb=1';
  constructor(
    private chat: OpenChatService,
    public messageService: MessagesFlowService
  ) {}

  ngOnInit(): void {
    this.chat.isExpanded.subscribe((expandStatus) => {
      if (expandStatus) {
        this.minimizeOrMaximize = 'remove';
      } else {
        this.minimizeOrMaximize = 'add';
      }
    });

    this.mainColor = this.chat.whiteLabel.header;
  }
  closeChat() {
    this.close.emit(this.chat.closeChatbox());
  }
  clearChat() {
    this.restartRequest.emit(true);
  }
  minimize() {
    this.chat.expandOrMinimize();
  }
}
