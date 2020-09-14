import { Injectable, EventEmitter } from "@angular/core";
import { Subject, BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import * as crypto from "crypto-js";

@Injectable({
  providedIn: "root",
})
export class MessagesFlowService {
  interactionstarted: boolean = false;
  clear = new EventEmitter<boolean>();
  chatclear: boolean;
  public metadata: {
    username: string;
    password: string;
    profileName?: string;
    sessionId?: string;
  };
  public userMsgs: Subject<string> = new Subject<string>();
  public botMsgs: Subject<any[]> = new Subject<any[]>();

  constructor(private http: HttpClient) {}

  getCredentials(metadataReceived: {
    username: string;
    password: string;
    profileName: string;
    sessionId: string;
  }) {
    this.metadata = metadataReceived;
    console.log(this.metadata);
  }

  userMessages(text: string) {
    text = text.trim();
    this.userMsgs.next(text);
  }

  firstInteraction(firstInteraction) {
    if (firstInteraction) {
      this.interactionstarted = true;
      this.botMessages("oi");
    }
  }
  //setEncryptedPass(pass: string): string {
  // let encryptedPass: string = crypto.AES.encrypt(
  //  pass,
  //  'AIA@Kyros123'
  //).toString();
  //return encryptedPass;
  //}

  botMessages(usermsg: string) {
    let response = [];
    this.http
      .post<any>(
        "https://bot.kyros.com.br/bot",
        {
          sender: `${this.metadata.username}-${this.metadata.profileName}-${this.metadata.sessionId}`,
          message: usermsg,
          metadata: JSON.stringify({
            username: this.metadata.username,
            password: this.metadata.password,
          }),
        },
        { headers: new HttpHeaders({ "Content-Type": "application/json" }) }
      )
      .subscribe(
        (botMsg) => {
          console.log(botMsg);
          if (botMsg.length > 0) {
            for (let i = 0; i < botMsg.length; i++) {
              if (botMsg[i].hasOwnProperty("buttons")) {
                response.push({
                  botText: botMsg[i].text,
                  buttons: botMsg[i].buttons,
                });
              } else {
                response.push({ botText: botMsg[i].text });
              }
            }
          } else {
            response.push({
              botText:
                "Não consigo resolver esta tarefa no momento por favor tente novamente mais tarde",
            });
          }
          if (response.length > 0) {
            this.botMsgs.next(response);
          }
        },
        (error) => {
          console.log(error);
          response.push({
            botText:
              "Desculpe, estou com dificuldades para me comunicar com você. Eu e meus colegas estamos trabalhando para atender aos " +
              "seus pedidos 👾. Tente novamente mais tarde",
          });
          this.botMsgs.next(response);
        }
      );
  }

  clearChat(willClear: boolean) {
    let response = [];
    this.chatclear = willClear;
    this.clear.emit(this.chatclear);
    this.interactionstarted = false;
    this.http
      .post<any>(
        "https://bot.kyros.com.br/bot",
        { sender: "Kyros", message: "/restart" },
        { headers: new HttpHeaders({ "Content-Type": "application/json" }) }
      )
      .subscribe(
        (botMsg) => {
          console.log(botMsg, "rest");
        },
        (error) => {
          console.log(error);
          response.push({
            botText:
              "Desculpe, estou com dificuldades para me comunicar com você. Eu e meus colegas estamos trabalhando para atender aos " +
              "seus pedidos 👾. Tente novamente mais tarde",
          });
          this.botMsgs.next(response);
        },
        () => this.firstInteraction(true)
      );
  }
}
