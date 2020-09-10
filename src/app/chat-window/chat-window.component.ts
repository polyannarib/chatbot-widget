import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MessagesFlowService } from '../messages-flow.service';
import { OpenChatService } from '../open-chat.service';
import { Subscription } from 'rxjs';
declare const annyang: any;

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css'],
})
export class ChatWindowComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  private micPressed: boolean = false;
  private userSaid: string = '';
  public micColor: boolean = false;
  mainColor: string;
  historyMessages = [];
  typing: boolean = false;
  opened: boolean;
  expanded: boolean = false;
  request: boolean;
  userInput: FormGroup = new FormGroup({
    text: new FormControl(''),
  });
  constructor(
    public messageService: MessagesFlowService,
    private chat: OpenChatService
  ) {
    this.chat.isOpen.subscribe((open) => {
      this.opened = open;
    });
    this.chat.isExpanded.subscribe((expand) => {
      this.expanded = expand;
    });
  }

  ngOnInit(): void {

    this.chat.chatboxColor.subscribe((whiteLabel) => {
      this.mainColor = whiteLabel;
    });
    
    this.chat.history.subscribe((lastMessages) => {
      this.historyMessages = lastMessages;
      console.log(this.historyMessages);
    });
    if (annyang !== null) {
      annyang.setLanguage('pt-br');
      annyang.addCallback('errorNetwork', () => {
        alert('Error de rede');
      });
      annyang.addCallback('errorPermissionBlocked', () => {
        alert('Erro de permissão');
      });
      annyang.addCallback('errorPermissionDenied', () => {
        alert('Erro de permissão');
      });
      annyang.addCallback('result', (phrases) => {
        this.userSaid = phrases[0];
        annyang.pause();
      });
    }

    this.sub = this.userInput.get('text').valueChanges.subscribe((value) => {
      value !== '' ? (this.typing = true) : (this.typing = false);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    if (annyang.getSpeechRecognizer() !== undefined) {
      annyang.abort();
    }
  }

  onSubmit() {
    if (this.userInput.value.text !== '') {
      this.messageService.userMessages(this.userInput.value.text);
      this.messageService.botMessages(this.userInput.value.text);
      this.userInput.setValue({ text: '' });
    } else if (this.micPressed) {
      this.waitFor(() => this.userSaid !== '').then(() => {
        this.messageService.userMessages(this.userSaid);
        this.messageService.botMessages(this.userSaid);
        this.userSaid = '';
        this.micPressed = false;
      });
    }
  }

  startListening() {
    if (annyang !== null) {
      this.micPressed = true;
      annyang.start();
      this.micColor = true;
    } else {
      alert('Reconhecimento de voz não suportado nesse navegador');
    }
  }

  stopListening() {
    this.micColor = false;
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

  closeChatbot(closed) {
    this.opened = closed;
    this.expanded = false;
  }

  restartAlert(request: boolean) {
    console.log('request: ' + request);
    this.request = request;
  }

  willRestart(restart: boolean) {
    this.request = false;
    if (restart) {
      this.messageService.clearChat(true);
    }
  }
}
