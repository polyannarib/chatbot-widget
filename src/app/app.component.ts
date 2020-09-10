import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  metadata = { username: '', password: '' };
  passedWhiteLabel: string = '#FF8e27';
  title = 'chatbot-widget';
  ngOnInit() {}
}
