import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MessagesFlowService {
  interactionstarted: boolean = false;
  clear = new EventEmitter<boolean>();
  chatclear: boolean;
  public userMsgs: Subject<string> = new Subject<string>();
  public botMsgs: Subject<string> = new Subject<string>();
  constructor(private http: HttpClient) {}

  userMessages(text: string) {
    text = text.trim();
    this.userMsgs.next(text);
  }

  botMessages(usermsg: string) {
    this.http
      .post<any>(
        'https://bot.kyros.com.br/bot',
        { sender: 'christian', message: usermsg },
        { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
      )
      .subscribe((botMsg) => {
        console.log(botMsg[0].text);
        this.botMsgs.next(botMsg[0].text);
      });
  }

  clearChat(willClear: boolean) {
    this.chatclear = willClear;
    this.clear.emit(this.chatclear);
    this.interactionstarted = false;
    this.startInteraction();
  }

  startInteraction(): void {
    if (!this.interactionstarted) {
      this.http
        .post<any>(
          'https://bot.kyros.com.br/bot',
          { sender: 'christian', message: 'oi' },
          { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
        )
        .subscribe((botMsg) => {
          console.log(botMsg);
          this.botMsgs.next(botMsg[0].text);
        });
      this.interactionstarted = true;
    }
  }
}
