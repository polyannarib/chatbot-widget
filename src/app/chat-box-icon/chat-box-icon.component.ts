import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-chat-box-icon',
  templateUrl: './chat-box-icon.component.html',
  styleUrls: ['./chat-box-icon.component.css'],
})
export class ChatBoxIconComponent implements OnInit {
  botIcon: string =
    'https://www.puzzel.com/uk/wp-content/uploads/sites/2/2018/08/puzzel-bot-icon.png';
  constructor() {}

  ngOnInit(): void {}
}
