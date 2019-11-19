import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TranslateModule } from '@ngx-translate/core';
import { MzModalModule, MzTooltipModule, MzButtonModule, MzInputModule, MzCollapsibleModule, MzRadioButtonModule } from 'ngx-materialize'
import { MatDatepickerModule, MatTooltipModule, MatFormFieldModule, MatInputModule, MatNativeDateModule, MatRadioModule, MatIconModule, MatButtonModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    // DashboardComponent, 
    // HomeComponent,
  ],
  // entryComponents: [
  //   ModalSuccessComponent,
  // ],
  imports: [
    // FormsModule,
    // ReactiveFormsModule,
    // CommonModule,
    // CoreModule,
    // SharedModule,
    // TranslateModule
  ]
})
export class HomeModule { }
