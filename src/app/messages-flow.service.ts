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
  public botButtons: Subject<[]> = new Subject<[]>();
  constructor(private http: HttpClient) {}

  userMessages(text: string) {
    text = text.trim();
    this.userMsgs.next(text);
  }

  botMessages(usermsg: string) {
    this.http
      .post<any>(
        'https://bot.kyros.com.br/bot',
        { sender: 'antonio', message: usermsg },
        { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
      )
      .subscribe(
        (botMsg) => {
          if (typeof botMsg[0] !== 'undefined') {
            this.botMsgs.next(botMsg[0].text);
            if (typeof botMsg[0].buttons !== 'undefined') {
              this.botButtons.next(botMsg[0].buttons);
            }
          }
        },
        (error) => {
          console.log(error);
          this.botMsgs.next(
            'Desculpe, estou com dificuldades para me comunicar com você. Eu e meus colegas estamos trabalhando para atender aos seus pedidos 👾. Tente novamente mais tarde'
          );
        }
      );
  }

  clearChat(willClear: boolean) {
    this.chatclear = willClear;
    this.clear.emit(this.chatclear);
    this.interactionstarted = false;
    this.botMessages('/restart');
    this.startInteraction();
  }

  startInteraction(): void {
    if (!this.interactionstarted) {
      this.http
        .post<any>(
          'https://bot.kyros.com.br/bot',
          { sender: 'Player', message: 'oi' },
          { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
        )
        .subscribe(
          (botMsg) => {
            this.botMsgs.next(botMsg[0].text);
            this.botButtons.next(botMsg[0].buttons);
          },
          (error) => {
            console.log(error);
            this.botMsgs.next(
              'Desculpe, estou com dificuldades para me comunicar com você. Eu e meus colegas estamos trabalhando para atender aos seus pedidos 👾. Tente novamente mais tarde'
            );
          }
        );
      this.interactionstarted = true;
    }
  }
}
