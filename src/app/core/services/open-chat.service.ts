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
    header: "",
    bot: "",
    user: "",
    buttons: "",
  });
  constructor() {}

  setWhiteLabel(whiteLabel: chatColors) {
    this.whiteLabel.next(whiteLabel);
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
