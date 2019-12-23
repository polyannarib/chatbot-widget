import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from '../admin.component';
import { ConfigComponent } from '../config/config.component';
import { CardCreateComponent } from '../card/card-create/card-create.component';
import { TeamCreateComponent } from '../team/team-create/team-create.component';
import { DepartmentCreateComponent } from '../department/department-create/department-create.component';
import { PlayersListComponent } from '../player/players-list/players-list.component';

const APP_ROUTES: Routes = [
  // { path: '', redirectTo: '', pathMatch: 'full' },
  // { path: '', component: AdminComponent },
  { path: '', component: AdminComponent, children: [
    { path: '', redirectTo: 'config', pathMatch: 'full' },
    { path: 'config', component: ConfigComponent },
    { path: 'card', component: CardCreateComponent },
    { path: 'team', component: TeamCreateComponent },
    { path: 'department', component: DepartmentCreateComponent },
    { path: 'player', component: PlayersListComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(APP_ROUTES)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
