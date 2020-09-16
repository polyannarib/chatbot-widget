import { Component, OnInit, OnDestroy, Input, ElementRef } from "@angular/core";
import { MessagesFlowService } from "../../../core/services/messages-flow.service";
import { OpenChatService } from "../../../core/services/open-chat.service";

@Component({
  selector: "app-chat-box",
  templateUrl: "./chat-box.component.html",
  styleUrls: ["./chat-box.component.css"],
})
export class ChatBoxComponent implements OnInit, OnDestroy {
  @Input() messages: any[];
  clear: boolean;
  borderColor: string;
  buttonsColor: string;
  fontColors: string[] = [];
  loadingMsg: boolean;
  constructor(
    public messageService: MessagesFlowService,
    public chat: OpenChatService,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    //Get White label
    this.chat.whiteLabel.subscribe((colors) => {
      this.buttonsColor = colors.buttons.color;
      this.borderColor = colors.header.color;
      this.buttonsColor = colors.buttons.color;
      this.fontColors[0] = colors.buttons.font;
      this.fontColors[1] = colors.user.font;
      this.fontColors[2] = colors.bot.font;
      this.elementRef.nativeElement.style.setProperty(
        "--bubbleUser",
        colors.user.color
      );
      this.elementRef.nativeElement.style.setProperty(
        "--bubbleBot",
        colors.bot.color
      );
    });

    //Clear Chat
    this.messageService.clear.subscribe((clearedMessages) => {
      if (clearedMessages) {
        this.messages = [];
      }
    });

    //Get messages from user
    this.messageService.userMsgs.subscribe(
      (message) => {
        let i: number = this.messages.length - 1;
        if (this.messages[i].hasOwnProperty("bot")) {
          for (let z = 0; z < this.messages[i].bot.length; z++) {
            if (this.messages[i].bot[z].hasOwnProperty("buttons")) {
              delete this.messages[i].bot[z].buttons;
            }
          }
        }
        this.messages.push({ user: message });
      },
      (error) => console.log(error)
    );
    //Get messages from bot
    this.messageService.botMsgs.subscribe(
      (message) => this.messages.push({ bot: message }),
      (error) => console.log(error)
    );
    //Display text while bot not answer
    this.messageService.loadingBotResponse.subscribe((loading) => {
      this.loadingMsg = loading;
      console.log("loading: " + loading);
    });
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
