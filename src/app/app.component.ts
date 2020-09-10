import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  metadata = { username: '', password: '' };
  passedWhiteLabel = {header: '#32a852', bot: '#d1d1d1', user: '#8fb599', buttons: '#7ff59e'};
  title = 'chatbot-widget';
  ngOnInit() {}
}
