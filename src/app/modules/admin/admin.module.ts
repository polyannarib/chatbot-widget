import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutocompleteLibModule } from 'angular-ng-autocomplete';

import { AdminRoutingModule } from './routing/admin-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared/shared.module';

import { AdminComponent } from './admin.component';
import { ConfigComponent } from './config/config.component';
import { CardCreateComponent } from './card/card-create/card-create.component';
import { TeamCreateComponent } from './team/team-create/team-create.component';
import { DepartmentCreateComponent } from './department/department-create/department-create.component';
import { PlayersListComponent } from './player/players-list/players-list.component';
import { CardListPlayerComponent } from './card/card-list-player/card-list-player.component';

@NgModule({
  declarations: [
    AdminComponent,
    ConfigComponent,
    CardCreateComponent,
    TeamCreateComponent,
    DepartmentCreateComponent,
    PlayersListComponent,
    CardListPlayerComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    AutocompleteLibModule 
  ],
  entryComponents: [
    CardListPlayerComponent
  ]
})
export class AdminModule { }