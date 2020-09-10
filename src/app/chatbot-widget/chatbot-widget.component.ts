import { Component, OnInit, Input } from '@angular/core';
import { MessagesFlowService } from '../services/messages-flow.service';
import {OpenChatService} from  '../services/open-chat.service'

@Component({
  selector: 'app-chatbot-widget',
  templateUrl: './chatbot-widget.component.html',
  styleUrls: ['./chatbot-widget.component.css'],
})
export class ChatbotWidgetComponent implements OnInit {
  @Input() meta: { username: string, password: string };
  @Input() windowColor;
  constructor(public messageService: MessagesFlowService,
              public chat : OpenChatService) {}

  ngOnInit(): void {
    console.log(this.windowColor);
    this.messageService.getCredentials(this.meta);
    this.chat.setWhiteLabel(this.windowColor)
  }
}
