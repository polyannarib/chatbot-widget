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
      (message) => {
        let i: number = this.messages.length - 1;
        console.log(i)
        console.log(this.messages)
        if(this.messages[i].hasOwnProperty('bot')) {
          for(let z=0; z<this.messages[i].bot.length; z++) {
            if(this.messages[i].bot[z].hasOwnProperty('buttons')) {
              console.log(this.messages[i].bot[z]);
              delete this.messages[i].bot[z].buttons;
            }
          }
        };
        this.messages.push({ user: message });
      },
      (error) => console.log(error)
    );

    this.messageService.botMsgs.subscribe(
      (message) => this.messages.push({ bot: message }),
      (error) => console.log(error)
    );
  }

  sendButton(buttonAction: string, userText: string) {
    this.messageService.botMessages(buttonAction);
    this.messageService.userMessages(userText);
  }

  trackByFn(index: number) {
    return index;
  }
}
