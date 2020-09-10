import { Component, OnInit, Input } from '@angular/core';
import { MessagesFlowService } from '../messages-flow.service';
import {OpenChatService} from  '../open-chat.service'

@Component({
  selector: 'app-chatbot-widget',
  templateUrl: './chatbot-widget.component.html',
  styleUrls: ['./chatbot-widget.component.css'],
})
export class ChatbotWidgetComponent implements OnInit {
  @Input() meta: { username: string; password: string };
  @Input() windowColor;
  constructor(public messageService: MessagesFlowService, public chat : OpenChatService) {}

  ngOnInit(): void {
    this.messageService.getCredentials(this.meta);
    this.chat.getWhiteLabel(this.windowColor)
  }
}
