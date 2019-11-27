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

// NgxMaterial components importados
import { MzToastModule } from 'ngx-materialize';
import { MzCollapsibleModule } from 'ngx-materialize';

// Material Angular components importados
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRadioModule } from '@angular/material/radio';
import { ButtonFinalizeComponent } from './components/buttons/button-finalize/button-finalize.component';
import { ButtonRemoveComponent } from './components/buttons/button-remove/button-remove.component';


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
    MatRadioModule
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
    MatRadioModule
  ],
  entryComponents: [
    FinalizeComponent,
    RemoveComponent
  ]
})
export class SharedModule { }
