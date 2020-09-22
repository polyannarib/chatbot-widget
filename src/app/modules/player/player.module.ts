import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayerRoutingModule } from './routing/player-routing.module';
import { PlayerComponent } from './player.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardBindComponent } from './card/card-bind/card-bind.component';

// Componentes chatbot
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { ChatBoxIconComponent } from './chat-box-icon/chat-box-icon.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { ChatBoxHeaderComponent } from './chat-window/chat-box-header/chat-box-header.component';
import { RestartWarningComponent } from './chat-window/restart-warning/restart-warning.component';
import { ChatbotWidgetComponent } from './chatbot-widget/chatbot-widget.component';

@NgModule({
  imports: [
    CommonModule,
    PlayerRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ChatBoxComponent,
    ChatBoxIconComponent,
    ChatWindowComponent,
    ChatBoxHeaderComponent,
    RestartWarningComponent,
    ChatbotWidgetComponent,
    ReactiveFormsModule
  ],
  declarations: [
    PlayerComponent, 
    CardBindComponent
  ]
})
export class PlayerModule { }
