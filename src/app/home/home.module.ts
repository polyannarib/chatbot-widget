import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ModalSuccessComponent } from './modal/success/modal-success.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TranslateModule } from '@ngx-translate/core';
import { MzModalModule, MzTooltipModule, MzButtonModule, MzInputModule, MzCollapsibleModule, MzRadioButtonModule } from 'ngx-materialize'
import { MatDatepickerModule, MatTooltipModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatNativeDateModule, MatRadioModule, MatIconModule, MatButtonModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from './shared/pipe/pipes.module';
import { AdminComponent } from './admin/admin.component';
import { PlayerCreateComponent } from './player/player-create/player-create.component';
import { DepartmentCreateComponent } from './department/department-create/department-create.component';
import { TeamCreateComponent } from './team/team-create/team-create.component';
import { CardCreateComponent } from './card/card-create/card-create.component';

import { ChartsModule } from 'ng2-charts';

const routes = [
  {
    path: '', 
    component: HomeComponent, 
    children: [
      {path:'dashboard', component: DashboardComponent},
      {path:'admin', component: AdminComponent},
      {path:'player', component: PlayerCreateComponent},
      {path:'department', component: DepartmentCreateComponent},
      {path:'card', component: CardCreateComponent},
      {path:'team', component: TeamCreateComponent},
      // {path:'project', loadChildren: './project/project.module#ProjectModule'},
      // {path:'calendar', loadChildren: './calendar/calendar.module#CalendarModule'}
  ]},
]

@NgModule({
  declarations: [
    DashboardComponent, 
    HomeComponent,
    ModalSuccessComponent,
    AdminComponent,
    PlayerCreateComponent,
    DepartmentCreateComponent,
    TeamCreateComponent,
    CardCreateComponent
  ],
  entryComponents: [
    ModalSuccessComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    PipesModule,
    TranslateModule,
    MzModalModule,
    MzButtonModule,
    MzInputModule,
    MzCollapsibleModule,
    MzRadioButtonModule,
    MatDatepickerModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatRadioModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MzTooltipModule,
    ChartsModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
