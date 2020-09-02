import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessagesFlowService {
  clear = new EventEmitter<boolean>();
  chatclear: boolean;
  public userMsgs: Subject<string> = new Subject<string>();
  public botMsgs: Subject<string> = new Subject<string>();
  constructor() {}

  userMessages(text: string) {
    text = text.trim();
    this.userMsgs.next(text);
  }

  botMessages() {
    setTimeout(() => {
      this.botMsgs.next('olá');
    }, 3000);
  }

  clearChat(willClear: boolean) {
    this.chatclear = willClear;
    this.clear.emit(this.chatclear);
  }
}
