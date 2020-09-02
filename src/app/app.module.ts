import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input'; 
import {MatFormFieldModule} from '@angular/material/form-field';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import {MatButtonModule} from '@angular/material/button'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatBoxIconComponent } from './chat-box-icon/chat-box-icon.component';
import { ChatBoxHeaderComponent } from './chat-window/chat-box-header/chat-box-header.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatBoxComponent,
    ChatWindowComponent,
    ChatBoxIconComponent,
    ChatBoxHeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
