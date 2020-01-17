import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayerRoutingModule } from './player-routing.module';
import { RegisterComponent } from './register/register.component';
import { PlayerComponent } from './player.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule(
  {
  declarations: [
    PlayerComponent, 
    RegisterComponent
  ],
  imports: [
    CommonModule,
    PlayerRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class PlayerModule { }
