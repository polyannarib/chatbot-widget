import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { OpenChatService } from "../../../core/services/open-chat.service";
import { MessagesFlowService } from "../../../core/services/messages-flow.service";

@Component({
  selector: "app-chat-box-icon",
  templateUrl: "./chat-box-icon.component.html",
  styleUrls: ["./chat-box-icon.component.css"],
})
export class ChatBoxIconComponent implements OnInit {
  firstInteraction: boolean = true;
  messages: any[] = [];
  botIcon: string = "assets/images/botIcon.png";
  constructor(
    private chat: OpenChatService,
    public messageService: MessagesFlowService
  ) {}

  ngOnInit(): void {}
  chatOpen() {
    this.chat.openChatboxFromIcon();
    this.messageService.firstInteraction(this.firstInteraction);
    this.firstInteraction = false;
  }
}
