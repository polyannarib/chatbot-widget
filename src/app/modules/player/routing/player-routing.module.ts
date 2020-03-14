import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayerComponent } from '../player.component';
import { CardBindComponent } from '../card/card-bind/card-bind.component';

const APP_ROUTES: Routes = [
  {
    path: '', component: PlayerComponent, children: [
      { path: '', redirectTo: 'bind/cards', pathMatch: 'full' },
      { path: 'bind/cards', component: CardBindComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(APP_ROUTES)],
  exports: [RouterModule]
})
export class PlayerRoutingModule { }
