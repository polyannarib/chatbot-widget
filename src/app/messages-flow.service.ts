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
  public botMsgs: Subject<any[]> = new Subject<any[]>();

  constructor(private http: HttpClient) {}
  userMessages(text: string) {
    text = text.trim();
    this.userMsgs.next(text);
  }

  firstInteraction(firstInteraction) {
    if (firstInteraction) {
      console.log('first interaction');
      this.interactionstarted = true;
      this.botMessages('oi');
    } else {
      console.log('not first interaction');
    }
  }

  botMessages(usermsg: string) {
    let response = [];
    this.http
      .post<any>(
        'https://bot.kyros.com.br/bot',
        { sender: 'Kyros', message: usermsg },
        { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
      )
      .subscribe(
        (botMsg) => {
          if (usermsg == '/restart') {
            console.log(botMsg);
          }
          if (botMsg.length > 0) {
            for (let i = 0; i < botMsg.length; i++) {
              if (botMsg[i].hasOwnProperty('buttons')) {
                response.push({
                  botText: botMsg[i].text,
                  buttons: botMsg[i].buttons,
                });
              } else {
                response.push({ botText: botMsg[i].text });
              }
            }
          }
          if(response.length > 0) {
            this.botMsgs.next(response);
          }
        },
        (error) => {
          console.log(error);
          response.push({
            botText: 'Desculpe, estou com dificuldades para me comunicar com você. Eu e meus colegas estamos trabalhando para atender aos ' + 
            'seus pedidos 👾. Tente novamente mais tarde'
          });
          this.botMsgs.next(response);
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
    let response = [];
    if (!this.interactionstarted) {
      this.http
        .post<any>(
          'https://bot.kyros.com.br/bot',
          { sender: 'Player', message: 'oi' },
          { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
        )
        .subscribe((botMsg) => {
          if (botMsg.length > 0) {
            for(let i=0; i<botMsg.length; i++) {
              if(botMsg[i].hasOwnProperty('buttons')) {
                response.push({ botText: botMsg[i].text, buttons: botMsg[i].buttons })
              }
              else {
                response.push({ botText: botMsg[i].text })
              }
            }
          }
          if(response.length > 0) {
            this.botMsgs.next(response);
          }
        },
        (error) => {
          console.log(error);
          response.push({
            botText: 'Desculpe, estou com dificuldades para me comunicar com você. Eu e meus colegas estamos trabalhando para atender aos ' + 
            'seus pedidos 👾. Tente novamente mais tarde'
          });
          this.botMsgs.next(response);
        }
      );
      this.interactionstarted = true;
    }
    this.botMessages('oi');
  }
}
