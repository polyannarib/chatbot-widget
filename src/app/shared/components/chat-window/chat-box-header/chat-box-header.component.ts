import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { OpenChatService } from "../../../../core/services/open-chat.service";
import { Output, EventEmitter } from "@angular/core";
import { MessagesFlowService } from "../../../../core/services/messages-flow.service";
import { Subscription } from 'rxjs';


@Component({
  selector: "app-chat-box-header",
  templateUrl: "./chat-box-header.component.html",
  styleUrls: ["./chat-box-header.component.css"],
})
export class ChatBoxHeaderComponent implements OnInit, OnDestroy {
  @Output() close = new EventEmitter<boolean>();
  @Output() restartRequest = new EventEmitter<boolean>();
  public bool: boolean = false;
  sub: Subscription;
  minMax: string = "add";
  headerColor: string;
  fontColor: string;
  request: boolean;
  headerIcon: string =
    "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Flh3.googleusercontent." +
    "com%2FpE5dgP2JoUsdqmsqCVRmsUQutQ7FH80O4ajh_yH4LW2kj3W7vMmbe_-tpzduyy3tDA%3Dw300&f=1&nofb=1";

  constructor(
    private chat: OpenChatService,
    public messageService: MessagesFlowService
  ) {}

  ngOnInit(): void {
    this.sub = this.messageService.disableButtons.subscribe((disable => {
      this.bool = disable;
      })
    );

    this.chat.isExpanded.subscribe((expandStatus) => {
      if (expandStatus) {
        this.minMax = "remove";
      } else {
        this.minMax = "add";
      }
    });

    this.chat.whiteLabel.subscribe((colors) => {
      this.headerColor = colors.header.color;
      this.fontColor = colors.header.font;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  closeChat() {
    this.close.emit(this.chat.closeChatbox());
  }

  clearChat() {
      this.messageService.clearRequest.next(true);
  }

  minimize() {
    this.chat.expandOrMinimize();
  }
}
