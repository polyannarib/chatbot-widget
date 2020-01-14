import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayerComponent } from './player.component';
import { RegisterComponent } from './register/register.component';

const APP_ROUTES: Routes = [
  {
    path: '', component: PlayerComponent, children: [
      { path: '', redirectTo: 'register', pathMatch: 'full' },
      { path: 'register', component: RegisterComponent, data: { scopes: [''] } },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(APP_ROUTES)],
  exports: [RouterModule]
})
export class PlayerRoutingModule { }
