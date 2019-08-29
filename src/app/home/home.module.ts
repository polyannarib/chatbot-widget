import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { HomeComponent } from './home/home.component';
import { TranslateModule } from '@ngx-translate/core';
import { MzModalModule, MzButtonModule, MzInputModule, MzCollapsibleModule, MzRadioButtonModule } from 'ngx-materialize'
import { FormsModule } from '@angular/forms';
import { PipesModule } from './shared/pipe/pipes.module';

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
    FormsModule,
    CommonModule,
    ChartsModule,
    PipesModule,
    TranslateModule,
    MzModalModule,
    MzButtonModule,
    MzInputModule,
    MzCollapsibleModule,
    MzRadioButtonModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
