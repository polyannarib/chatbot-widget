import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  opened: boolean = false;
  title = 'chatbot-widget';
  openChat(){
    this.opened = !this.opened
    return this.opened
  }
}
