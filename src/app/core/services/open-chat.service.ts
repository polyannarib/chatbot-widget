import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { chatColors } from "../../shared/models/chatbotWhiteLabel";

@Injectable({
  providedIn: "root",
})
export class OpenChatService {
  public history: Subject<any[]> = new Subject<any[]>();
  public isExpanded = new BehaviorSubject<boolean>(true);
  public isOpen = new BehaviorSubject<boolean>(false);
  private isOpenState: boolean = this.isOpen.value;
  public whiteLabel = new BehaviorSubject<chatColors>({
    header: { color: "", font: "" },
    bot: { color: "", font: "" },
    user: { color: "", font: "" },
    buttons: { color: "", font: "" },
  });

  constructor() {}

  setWhiteLabel(whiteLabel: chatColors) {
    this.waitFor(() => whiteLabel.header.color !== "").then(() => {
      let rgb = [];
      let hsp: number;
      Object.entries(whiteLabel).forEach((prop) => {
        if(!prop[1].hasOwnProperty("bot")) {
          rgb[0] = prop[1].color.slice(1, 3);
          rgb[1] = prop[1].color.slice(3, 5);
          rgb[2] = prop[1].color.slice(5);
          rgb[0] = parseInt(rgb[0], 16);
          rgb[1] = parseInt(rgb[1], 16);
          rgb[2] = parseInt(rgb[2], 16);
          // HSP color model, equation from http://alienryderflex.com/hsp.html
          hsp = Math.sqrt(
            0.299 * (rgb[0] * rgb[0]) +
            0.587 * (rgb[1] * rgb[1]) +
            0.114 * (rgb[2] * rgb[2])
          );
          if(hsp > 127.5) {
            prop[1].font = "#000";
          }
          else {
            prop[1].font = "#FFF";
          }
        }
      })
      this.whiteLabel.next(whiteLabel);
      console.log(whiteLabel);
    })
  }

  private waitFor(condition) {
    const poll = (resolve) => {
      if (condition()) {
        resolve();
      } else {
        setTimeout(() => poll(resolve), 300);
      }
    };
    return new Promise(poll);
  }

  openChatboxFromIcon(): void {
    this.isOpen.next(!this.isOpenState);
    this.isExpanded.next(true);
    this.isOpenState = this.isOpen.value;
  }
  closeChatbox(): boolean {
    this.isOpen.next(false);
    this.isOpenState = false;
    return false;
  }
  expandOrMinimize() {
    this.isExpanded.next(!this.isExpanded.getValue());
  }

  storeMessages(conversation) {
    this.history.next(conversation);
  }
}
