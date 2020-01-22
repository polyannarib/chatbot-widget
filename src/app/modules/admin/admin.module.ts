import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './routing/admin-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared/shared.module';

import { AdminComponent } from './admin.component';
import { ConfigComponent } from './config/config.component';
import { CardCreateComponent } from './card/card-create/card-create.component';
import { TeamCreateComponent } from './team/team-create/team-create.component';
import { DepartmentCreateComponent } from './department/department-create/department-create.component';
import { PlayersListComponent } from './player/players-list/players-list.component';

@NgModule({
  declarations: [
    AdminComponent,
    ConfigComponent,
    CardCreateComponent,
    TeamCreateComponent,
    DepartmentCreateComponent,
    PlayersListComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }