import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayerComponent } from '../player.component';
import { CardBindComponent } from '../card/card-bind/card-bind.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const APP_ROUTES: Routes = [
  {
    path: '', component: PlayerComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard], children: [
      { path: '', redirectTo: 'bind/cards', pathMatch: 'full' },
      { path: 'bind/cards', component: CardBindComponent },
    ], data: { scopes: ['WP.PLAYER'] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(APP_ROUTES)],
  exports: [RouterModule]
})
export class PlayerRoutingModule { }
