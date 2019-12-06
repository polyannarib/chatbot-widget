import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CoreModule } from '../core/core.module';

// Pipes do projeto
import { FilterListPipe } from './pipe/filter.pipe';

// Componentes criados no projeto
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component'
import { LoadingComponent } from './components/loading/loading.component';
import { CountComponent } from './components/count/count.component';
import { FinalizeComponent } from './components/modal/finalize/finalize.component';
import { RemoveComponent } from './components/modal/remove/remove.component';
import { SuspendComponent } from './components/modal/suspend/suspend.component';
import { BaseModalComponent } from './components/modal/base-modal/base-modal.component';
import { ButtonFinalizeComponent } from './components/buttons/button-finalize/button-finalize.component';
import { ButtonRemoveComponent } from './components/buttons/button-remove/button-remove.component';
import { ButtonSuspendComponent } from './components/buttons/button-suspend/button-suspend.component';
import { ButtonDesignateComponent } from './components/buttons/button-designate/button-designate.component';
import { ButtonReplanComponent } from './components/buttons/button-replan/button-replan.component';

// NgxMaterial components importados
import { MzToastModule } from 'ngx-materialize';
import { MzCollapsibleModule } from 'ngx-materialize';

// Material Angular components importados
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MzToastModule,
    MzCollapsibleModule,
    MatPaginatorModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    TranslateModule,
    MatRadioModule,
    MatDatepickerModule,
    MatFormFieldModule
  ],
  declarations: [
    FilterListPipe,
    HeaderComponent,
    FooterComponent,
    LoadingComponent,
    CountComponent,
    FinalizeComponent,
    RemoveComponent,
    SuspendComponent,
    BaseModalComponent,
    ButtonFinalizeComponent,
    ButtonRemoveComponent,
    ButtonSuspendComponent,
    ButtonDesignateComponent,
    ButtonReplanComponent,
  ],
  exports: [
    FilterListPipe,
    HeaderComponent,
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
    SuspendComponent,
    BaseModalComponent,
    MatRadioModule,
    MatDatepickerModule,
    MatFormFieldModule,
    ButtonFinalizeComponent,
    ButtonRemoveComponent,
    ButtonSuspendComponent,
    ButtonDesignateComponent,
    ButtonReplanComponent,
  ],
  entryComponents: [
    FinalizeComponent,
    RemoveComponent,
    SuspendComponent
  ]
})
export class SharedModule { }
