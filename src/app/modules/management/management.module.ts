import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManagementComponent } from './management.component';


@NgModule({
  declarations: [DashboardComponent, ManagementComponent],
  imports: [
    CommonModule
  ]
})
export class ManagementModule { }
