import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MessagesFlowService } from '../messages-flow.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {
  typing: boolean = false;
  userInput: FormGroup = new FormGroup({
    text: new FormControl(""),
  })

  constructor(public messageService: MessagesFlowService) { }


  ngOnInit(): void {
    this.userInput.get("text").valueChanges.subscribe(value => {
      console.log(value);
      if(value !== ""){
        this.typing = true;
      }
      else {
        this.typing = false;
      }
    })
  }

  onSubmit(){
    if(this.userInput.value.text !== "") {
      this.messageService.userMessages(this.userInput.value.text);
      this.messageService.botMessages();
      this.userInput.setValue({text: ""});
    }
  }

}
