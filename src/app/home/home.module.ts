import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ModalSuccessComponent } from './modal/success/modal-success.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TranslateModule } from '@ngx-translate/core';
import { MzModalModule, MzTooltipModule, MzButtonModule, MzInputModule, MzCollapsibleModule, MzRadioButtonModule } from 'ngx-materialize'
import { MatDatepickerModule, MatTooltipModule, MatAutocompleteModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatNativeDateModule, MatRadioModule, MatIconModule, MatButtonModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from './shared/pipe/pipes.module';
import { AdminComponent } from './admin/admin.component';
import { PlayerCreateComponent } from './player/player-create/player-create.component';
import { DepartmentCreateComponent } from './department/department-create/department-create.component';
import { TeamCreateComponent } from './team/team-create/team-create.component';
import { CardCreateComponent } from './card/card-create/card-create.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';


import { ChartsModule } from 'ng2-charts';
import { PlayerListComponent } from './player/player-list/player-list.component';



//TABELA EDITAVEL
import '../polyfills';
import {HttpClientModule} from '@angular/common/http';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { EditableComponent } from './dashboard/editable/editable.component';
import { ViewModeDirective } from './dashboard/editable/view-mode.directive';
import { EditModeDirective } from './dashboard/editable/edit-mode.directive';
import { FocusableDirective } from './dashboard/focusable.directive';
import { EditableOnEnterDirective } from './dashboard/editable/edit-on-enter.directive';



//ANGULAR MATERIAL
import {A11yModule} from '@angular/cdk/a11y';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTreeModule,
} from '@angular/material';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

const routes = [
  {
    path: '', 
    component: HomeComponent, 
    children: [
      { path:'dashboard', component: DashboardComponent },
      { path:'admin', component: AdminComponent },
      { path:'player', component: PlayerListComponent },
      { path:'department', component: DepartmentCreateComponent },
      { path:'card', component: CardCreateComponent },
      { path:'team', component: TeamCreateComponent },
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
    CardCreateComponent,
    PlayerListComponent


    EditableComponent,ViewModeDirective,
    EditModeDirective, FocusableDirective, 
    EditableOnEnterDirective
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
    MatAutocompleteModule,
    AutocompleteLibModule,
    MzTooltipModule,
    ChartsModule,
    RouterModule.forChild(routes),

    
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,



    A11yModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    PortalModule,
    ScrollingModule,
    AutocompleteLibModule,
  ]
})

export class HomeModule { }

