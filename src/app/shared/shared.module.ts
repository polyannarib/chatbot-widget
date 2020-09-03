import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CoreModule } from '../core/core.module';
import { RouterModule } from '@angular/router';

// Pipes do projeto
// import { FilterListPipe } from './pipe/filter.pipe';
import { ImagePipe } from './pipe/image.pipe';
import { SafePipe } from './pipe/safe.pipe';

// Componentes criados no projeto
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoadingComponent } from './components/loading/loading.component';
import { CountComponent } from './components/count/count.component';
import { InitializeComponent } from './components/modal/initialize/initialize.component';
import { FinalizeComponent } from './components/modal/finalize/finalize.component';
import { RemoveComponent } from './components/modal/remove/remove.component';
import { SuspendComponent } from './components/modal/suspend/suspend.component';
import { BaseModalComponent } from './components/modal/base-modal/base-modal.component';
import { ButtonInitializeComponent } from './components/buttons/button-initialize/button-initialize.component';
import { ButtonFinalizeComponent } from './components/buttons/button-finalize/button-finalize.component';
import { ButtonRemoveComponent } from './components/buttons/button-remove/button-remove.component';
import { ButtonSuspendComponent } from './components/buttons/button-suspend/button-suspend.component';
import { ButtonDesignateComponent } from './components/buttons/button-designate/button-designate.component';
import { ButtonReplanComponent } from './components/buttons/button-replan/button-replan.component';
import { ChartjsComponent } from './components/chartjs/chartjs.component';
import { SucessComponent } from './components/modal/sucess/sucess.component';
import { ErrorComponent } from './components/modal/error/error.component';
import { NotifyComponent } from './components/notify/notify.component';
import { EditableComponent } from './components/editable/editable.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MenuComponent } from './components/menu/menu.component';
import { SlickComponent } from './components/slick/slick.component';
import { ProgressComponent } from './components/progress/progress.component';
import { BoxPropertyComponent } from './components/box-property/box-property.component';
import { ConfirmComponent } from './components/modal/confirm/confirm.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { CollapseComponent } from './components/collapse/collapse.component';
import { RemoveTaskComponent } from './components/modal/remove-task/remove-task.component';
import { AttachmentComponent } from './components/modal/attachment/attachment.component';
import { ExtractComponent } from '../modules/player/extract/extract.component';

// Diretivas
import { EditModeDirective } from './directives/edit-mode.directive';
import { ViewModeDirective } from './directives/view-mode.directive';
import { EditableOnEnterDirective } from './directives/edit-on-enter.directive';
import { FocusableDirective } from './directives/focusable.directive';
import { RectangleDirective } from './directives/rectangle.directive';

// NgxMaterial components importados
import { MzCollapsibleModule } from 'ngx-materialize';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
// import { NgxPaginationModule } from 'ngx-pagination';

// Material Angular components importados
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';

//Serviços
import { MainColorDirective } from './directives/main-color.directive';
import { PrimaryColorDirective } from './directives/primary-color.directive';
import { SecundaryColorDirective } from './directives/secundary-color.directive';
import { ButtonGiveBackComponent } from './components/buttons/button-give-back/button-give-back.component';
import { GiveBackComponent } from './components/modal/give-back/give-back.component';
import { ConflictInitializeComponent } from './components/modal/conflict-initialize/conflict-initialize.component';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MzCollapsibleModule,
    TranslateModule,
    MatPaginatorModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatRadioModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatTableModule,
    MatSnackBarModule,
    MatBottomSheetModule,
    MatListModule,
    MatTabsModule,
    MatCheckboxModule,
    MatSelectModule,
    MatButtonModule,
    MatChipsModule,
    MatInputModule,
    MatNativeDateModule,
    MatTreeModule,
    MatIconModule,
    MatBadgeModule,
    RouterModule
  ],
  declarations: [
    SidebarComponent,
    MenuComponent,
    BoxPropertyComponent,
    HeaderComponent,
    FooterComponent,
    LoadingComponent,
    CountComponent,
    FinalizeComponent,
    RemoveComponent,
    RemoveTaskComponent,
    SuspendComponent,
    BaseModalComponent,
    ButtonFinalizeComponent,
    ButtonRemoveComponent,
    ButtonSuspendComponent,
    ButtonDesignateComponent,
    ButtonReplanComponent,
    ChartjsComponent,
    SucessComponent,
    ErrorComponent,
    NotifyComponent,
    EditableComponent,
    EditModeDirective,
    ViewModeDirective,
    EditableOnEnterDirective,
    FocusableDirective,
    SlickComponent,
    RectangleDirective,
    ProgressComponent,
    ConfirmComponent,
    PaginatorComponent,
    CollapseComponent,
    MainColorDirective,
    PrimaryColorDirective,
    SecundaryColorDirective,
    ImagePipe,
    SafePipe,
    RemoveTaskComponent,
    AttachmentComponent,
    ExtractComponent,
    ButtonInitializeComponent,
    InitializeComponent,
    ButtonGiveBackComponent,
    GiveBackComponent,
    ConflictInitializeComponent
  ],
  exports: [
    MenuComponent,
    BoxPropertyComponent,
    FooterComponent,
    TranslateModule,
    MatPaginatorModule,
    MatDialogModule,
    MzCollapsibleModule,
    MatProgressSpinnerModule,
    LoadingComponent,
    CountComponent,
    MatTooltipModule,
    FinalizeComponent,
    RemoveComponent,
    RemoveTaskComponent,
    AttachmentComponent,
    SuspendComponent,
    BaseModalComponent,
    MatRadioModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatTableModule,
    MatSnackBarModule,
    MatBottomSheetModule,
    MatListModule,
    MatTabsModule,
    MatCheckboxModule,
    MatSelectModule,
    MatButtonModule,
    MatChipsModule,
    MatInputModule,
    MatNativeDateModule,
    MatTreeModule,
    MatIconModule,
    MatBadgeModule,
    ButtonFinalizeComponent,
    ButtonRemoveComponent,
    ButtonSuspendComponent,
    ButtonDesignateComponent,
    ButtonReplanComponent,
    ButtonGiveBackComponent,
    ChartjsComponent,
    EditableComponent,
    SlickComponent,
    ProgressComponent,
    SidebarComponent,
    HeaderComponent,
    NotifyComponent,
    EditModeDirective,
    ViewModeDirective,
    EditableOnEnterDirective,
    FocusableDirective,
    PaginatorComponent,
    CollapseComponent,
    ImagePipe,
    SafePipe,
    ButtonInitializeComponent,
    InitializeComponent,
    GiveBackComponent,
    ConflictInitializeComponent
  ],
  entryComponents: [
    FinalizeComponent,
    RemoveComponent,
    SuspendComponent,
    NotifyComponent,
    SucessComponent,
    ErrorComponent,
    ConfirmComponent,
    RemoveTaskComponent,
    AttachmentComponent,
    ExtractComponent,
    InitializeComponent,
    GiveBackComponent,
    ConflictInitializeComponent
  ],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      }
    }
  ]
})
export class SharedModule { }
