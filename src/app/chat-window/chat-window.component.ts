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
  opened: boolean;
  userInput: FormGroup = new FormGroup({
    text: new FormControl(''),
  });

  constructor(
    public messageService: MessagesFlowService,
    private chat: OpenChatService
  ) {
    this.chat.isOpen.subscribe((open) => (this.opened = open));
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.userInput.value.text !== '') {
      this.messageService.userMessages(this.userInput.value.text);
      this.messageService.botMessages();
      this.userInput.setValue({ text: '' });
    }
  }
  closeChatbot(closed) {
    this.opened = closed;
  }
}
