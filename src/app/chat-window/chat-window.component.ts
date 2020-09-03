import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MessagesFlowService } from '../messages-flow.service';
import { OpenChatService } from '../open-chat.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css'],
})
export class ChatWindowComponent implements OnInit {
  private speechRec = null;
  private micPressed: boolean = false;
  private userSaid: string = '';
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
      this.expanded = open;
    });
  }

  ngOnInit(): void {
    this.userInput.get('text').valueChanges.subscribe((value) => {
      console.log(value);
      value !== '' ? (this.typing = true) : (this.typing = false);
    });

    if ('speechSynthesis' in window) {
      this.speechRec = new window.SpeechRecognition(); // || window.webkitSpeechRecognition() -> a testar window.speechRecognition || window.webkitSpeechRecognition;
      this.speechRec.onresult = (e) => {
        this.userSaid = e.results[0][0].transcript;
        console.log(e.results[0][0].transcript);
      };
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
    if (this.speechRec !== null) {
      this.speechRec.start();
      this.micPressed = true;
    } else {
      alert('Reconhecimento de voz não suportado nesse navegador');
    }
  }

  stopListening() {
    if (this.speechRec !== null) {
      this.speechRec.stop();
    }
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
  expand() {
    this.expanded = !this.expanded;
  }
}
