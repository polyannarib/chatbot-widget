import { AuthGuardService } from './guards/auth-guard';
import { AuthService } from './home/shared/services/auth.service';
import { LoginComponent } from './login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { MaterializeModule } from 'angular2-materialize';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ReactiveFormsModule } from '@angular/forms';
import { Interceptor } from './login/auth-interceptor';
import { ProjectService } from './home/shared/services/project.service';
import { DatePipe } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import { MzModalModule, MzTooltipModule, MzButtonModule, MzInputModule, MzCollapsibleModule, MzRadioButtonModule } from 'ngx-materialize'
import { LoadingServiceComponent } from './home/loading-service/loading-service.component';
import { LoadingService } from './home/shared/services/loading.service';
import { ModalErrorComponent } from './home/modal/error/modal-error.component';
import pt from '@angular/common/locales/pt';
import { NoteService } from './home/shared/services/note.service';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';

registerLocaleData(pt);

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoadingServiceComponent,
    ModalErrorComponent,
  ],
  entryComponents: [
    ModalErrorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    MzModalModule,
    MzButtonModule,
    MzTooltipModule,
    MzInputModule,
    MzCollapsibleModule,
    MzRadioButtonModule,
    MaterializeModule,
    HttpClientModule,
    NgxSpinnerModule,
    Interceptor,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient]
      }
    })
  ],
  providers: [
    AuthService,
    AuthGuardService,
    ProjectService,
    LoadingService,
    NoteService,
    DatePipe,
    { provide: LOCALE_ID, useValue: 'pt' },
  ],
  bootstrap: [AppComponent],


})
export class AppModule { }
