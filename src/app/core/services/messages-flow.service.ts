import { Injectable, EventEmitter } from "@angular/core";
import { Subject, BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class MessagesFlowService {
  interactionstarted: boolean = false;
  clear = new EventEmitter<boolean>();
  chatclear: boolean;
  loadingBotResponse = new BehaviorSubject<boolean>(false);
  public metadata: {
    username: string;
    profileName: string;
    sessionId: string;
  } = {
    username: localStorage.getItem("username"),
    profileName: localStorage.getItem("profileName"),
    sessionId: localStorage.getItem("sessionId"),
  };
  public userMsgs: Subject<string> = new Subject<string>();
  public botMsgs: Subject<any[]> = new Subject<any[]>();

  constructor(private http: HttpClient) {}

  getCredentials(
    metadataReceived: {
      username: string;
      profileName: string;
      sessionId: string;
    },
    password: string
  ) {
    this.metadata = metadataReceived;
    localStorage.setItem("usename", metadataReceived.username);
    localStorage.setItem("profileName", metadataReceived.profileName);
    localStorage.setItem("sessionId", metadataReceived.sessionId);
    this.passCredentialsToBot(password);
  }

  userMessages(text: string) {
    text = text.trim();
    this.userMsgs.next(text);
    this.loadingBotResponse.next(true);
  }

  firstInteraction(firstInteraction) {
    if (firstInteraction) {
      this.interactionstarted = true;
      this.botMessages("oi");
      this.loadingBotResponse.next(true);
    }
  }

  botMessages(usermsg: string) {
    let response = [];
    this.http
      .post<any>(
        "https://bot.kyros.com.br/chatWidget",
        {
          sender: `${this.metadata.username}-${this.metadata.profileName}-${this.metadata.sessionId}`,
          message: usermsg,
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
            this.loadingBotResponse.next(false);
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
          this.loadingBotResponse.next(false);
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
        "https://bot.kyros.com.br/chatWidget",
        {
          sender: `${this.metadata.username}-${this.metadata.profileName}-${this.metadata.sessionId}`,
          message: "/restart",
        },
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
  passCredentialsToBot(pass: string) {
    this.http
      .post<any>(
        "https://bot.kyros.com.br/loginWidget",
        {
          sender: `${this.metadata.username}-${this.metadata.profileName}-${this.metadata.sessionId}`,
          metadata: JSON.stringify({
            username: this.metadata.username,
            password: pass,
          }),
        },
        { headers: new HttpHeaders({ "Content-Type": "application/json" }) }
      )
      .subscribe(
        (sucess) => {
          console.log("sucess: " + sucess);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
