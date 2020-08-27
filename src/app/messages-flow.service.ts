import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesFlowService {
  public userMsgs: Subject<string> = new Subject<string>();
  public botMsgs: Subject<string> = new Subject<string>();

  constructor() { }

  userMessages(text: string) {
    text = text.trim();
    this.userMsgs.next(text);
  }

  botMessages() {
    setTimeout(() => {this.botMsgs.next("olá")}, 3000);
  }
}
