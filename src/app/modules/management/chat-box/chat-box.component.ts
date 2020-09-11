import { Component, OnInit, OnDestroy, Input, ElementRef } from '@angular/core';
import { MessagesFlowService } from '../../../core/services/messages-flow.service';
import { OpenChatService } from '../../../core/services/open-chat.service';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css'],
})
export class ChatBoxComponent implements OnInit, OnDestroy {
  @Input() messages: any[];
  clear: boolean;
  public mainColors = { border: "", buttons: "" };
  constructor(
    public messageService: MessagesFlowService,
    public chat: OpenChatService,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.mainColors.buttons = this.chat.whiteLabel.buttons;
    this.mainColors.border = this.chat.whiteLabel.header;
    this.elementRef.nativeElement.style.setProperty('--bubbleUser', this.chat.whiteLabel.user);
    this.elementRef.nativeElement.style.setProperty('--bubbleBot', this.chat.whiteLabel.bot)

    this.messageService.clear.subscribe((clearedMessages) => {
      if (clearedMessages) {
        this.messages = [];
      }
    });
    this.messageService.userMsgs.subscribe(
      (message) => {
        let i: number = this.messages.length - 1;
        if (this.messages[i].hasOwnProperty('bot')) {
          for (let z = 0; z < this.messages[i].bot.length; z++) {
            if (this.messages[i].bot[z].hasOwnProperty('buttons')) {
              delete this.messages[i].bot[z].buttons;
            }
          }
        }
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

  ngOnDestroy() {
    this.chat.storeMessages(this.messages);
    this.messages = [];
  }
}
