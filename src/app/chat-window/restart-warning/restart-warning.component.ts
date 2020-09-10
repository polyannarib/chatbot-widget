import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { OpenChatService } from 'src/app/services/open-chat.service';

@Component({
  selector: 'app-restart-warning',
  templateUrl: './restart-warning.component.html',
  styleUrls: ['./restart-warning.component.css'],
})
export class RestartWarningComponent implements OnInit {
  @Output() requestStatus = new EventEmitter<boolean>();
  public mainColor: string;

  constructor(private chat: OpenChatService) {}

  ngOnInit(): void {
    this.mainColor = this.chat.whiteLabel.user;
  }

  restartRequest(status: boolean) {
    this.requestStatus.emit(status);
  }
}
