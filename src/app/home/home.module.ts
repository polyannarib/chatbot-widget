import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ModalSuccessComponent } from './modal/success/modal-success.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TranslateModule } from '@ngx-translate/core';
import { MzModalModule, MzTooltipModule, MzButtonModule, MzInputModule, MzCollapsibleModule, MzRadioButtonModule } from 'ngx-materialize'
import { MatDatepickerModule, MatTooltipModule, MatFormFieldModule, MatInputModule, MatNativeDateModule, MatRadioModule, MatIconModule, MatButtonModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from './shared/pipe/pipes.module';
import { ChartsModule } from 'ng2-charts';

const routes = [
  {
    path: '', 
    component: HomeComponent, 
    children: [
      {path:'dashboard', component: DashboardComponent},
      {path:'project', loadChildren: './project/project.module#ProjectModule'},
      {path:'card', loadChildren: './card/card.module#CardModule'},
      {path:'player', loadChildren: './player/player.module#PlayerModule'},
      {path:'calendar', loadChildren: './calendar/calendar.module#CalendarModule'}
  ]},
]

@NgModule({
  declarations: [
    DashboardComponent, 
    HomeComponent,
    ModalSuccessComponent
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
