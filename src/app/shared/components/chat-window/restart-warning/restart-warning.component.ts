import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { OpenChatService } from "../../../../core/services/open-chat.service";
import {MessagesFlowService} from '../../../../core/services/messages-flow.service'

@Component({
  selector: "app-restart-warning",
  templateUrl: "./restart-warning.component.html",
  styleUrls: ["./restart-warning.component.css"],
})
export class RestartWarningComponent implements OnInit {
  @Output() requestStatus = new EventEmitter<boolean>();
  restartColor: string;
  fontColor: string;

  constructor(private chat: OpenChatService, private messageService: MessagesFlowService) {}

  ngOnInit(): void {
    this.chat.whiteLabel.subscribe((colors) => {
      this.restartColor = colors.user.color;
      this.fontColor = colors.user.font;
    });
  }

  restartRequest(status: boolean) {
    if(!status){
      this.messageService.clearRequest.next(false);
    }
    else {
      this.messageService.clearChat();
      this.messageService.disableRestart.next(true);
    }
  }
}
