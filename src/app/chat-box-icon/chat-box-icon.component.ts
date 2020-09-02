import { Component, OnInit } from '@angular/core';
import { OpenChatService } from '../open-chat.service';
import { MessagesFlowService } from '../messages-flow.service';

@Component({
  selector: 'app-chat-box-icon',
  templateUrl: './chat-box-icon.component.html',
  styleUrls: ['./chat-box-icon.component.css'],
})
export class ChatBoxIconComponent implements OnInit {
  botIcon: string =
    'https://www.puzzel.com/uk/wp-content/uploads/sites/2/2018/08/puzzel-bot-icon.png';
  constructor(
    private chat: OpenChatService,
    public messageService: MessagesFlowService
  ) {}

  ngOnInit(): void {}
  chatOpen() {
    this.chat.openChatboxFromIcon();
    this.messageService.startInteraction();
  }
}