import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessagesFlowService } from '../messages-flow.service';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css'],
})
export class ChatBoxComponent implements OnInit {
  public messages = [];
  clear: boolean;
  constructor(public messageService: MessagesFlowService) {}

  ngOnInit(): void {
    this.messageService.clear.subscribe((clearedMessages) => {
      if (clearedMessages) {
        this.messages = [];
      }
    });
    this.messageService.userMsgs.subscribe(
      (message) => this.messages.push({ user: message }),
      (error) => console.log(error)
    );

    this.messageService.botMsgs.subscribe(
      (message) => this.messages.push({ bot: message }),
      (error) => console.log(error)
    );

    this.messageService.botButtons.subscribe(
      (button) => {
        this.messages.push({ buttons: button });
      },
      (error) => console.log(error)
    );
  }
  sendButton(buttonAction: string) {
    this.messageService.botMessages(buttonAction);
  }
}
