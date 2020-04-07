import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayerRoutingModule } from './routing/player-routing.module';
import { PlayerComponent } from './player.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardBindComponent } from './card/card-bind/card-bind.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CardInterceptor } from 'src/app/core/interceptors/card-interceptor';

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
    CardBindComponent
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: CardInterceptor, multi: true }
  ]
})
export class PlayerModule { }
