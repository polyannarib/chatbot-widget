import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayerRoutingModule } from './routing/player-routing.module';
import { PlayerComponent } from './player.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardBindComponent } from './card/card-bind/card-bind.component';
import { ExtractComponent } from './extract/extract.component';

@NgModule({
  imports: [
    CommonModule,
    PlayerRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    PlayerComponent, 
    CardBindComponent, 
    ExtractComponent
  ],
  entryComponents: [
    ExtractComponent
  ]
})
export class PlayerModule { }
