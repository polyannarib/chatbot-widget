import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { HomeComponent } from './home/home.component';
import { TranslateModule } from '@ngx-translate/core';

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
  declarations: [DashboardComponent, HomeComponent],
  imports: [
    CommonModule,
    ChartsModule,
    TranslateModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
