import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';

import { FilterListPipe } from './pipe/filter.pipe';

import { ModalErrorComponent } from './components/modal/error/modal-error.component';
import { ModalSuccessComponent } from '../modules/home/shared/modal/success/modal-success.component';
import { LoadingServiceComponent } from './components/loading-service/loading-service.component';
import { MzModalModule, MzButtonModule, MzTooltipModule, MzInputModule, MzCollapsibleModule, MzRadioButtonModule, MaterializeModule } from 'ngx-materialize';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule, MatRadioModule, MatButtonModule, MatTooltipModule, MatIconModule } from '@angular/material';
import { CoreModule } from '../core/core.module';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { LOCALE_ID } from '@angular/core';
import pt from '@angular/common/locales/pt';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';

registerLocaleData(pt);

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient]
      }
    }),
    HttpClientModule
  ],
  declarations: [
    // LoadingServiceComponent,
    // ModalErrorComponent,
    // ModalSuccessComponent,
    FilterListPipe
  ],
  exports: [
    // LoadingServiceComponent,
    // ModalErrorComponent,
    // ModalSuccessComponent,
    FilterListPipe
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
  ]
})
export class SharedModule { }
