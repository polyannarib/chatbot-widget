import { Component, OnInit, Input } from "@angular/core";
import { MessagesFlowService } from "../../../core/services/messages-flow.service";
import { OpenChatService } from "../../../core/services/open-chat.service";

@Component({
  selector: "app-chatbot-widget",
  templateUrl: "./chatbot-widget.component.html",
  styleUrls: ["./chatbot-widget.component.css"],
})
export class ChatbotWidgetComponent implements OnInit {
  //@Input() sender: { profileName: string; sessionId: string };
  @Input() windowColor;
  constructor(
    public messageService: MessagesFlowService,
    public chat: OpenChatService
  ) {}

  ngOnInit(): void {
    this.chat.setWhiteLabel(this.windowColor);
  }
}
