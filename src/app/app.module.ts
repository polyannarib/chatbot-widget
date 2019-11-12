import { AuthGuardService } from './core/guards/auth-guard';
import { AuthService } from './core/services/auth.service';
import { LoginComponent } from './modules/auth/login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { MaterializeModule } from 'angular2-materialize';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ReactiveFormsModule } from '@angular/forms';
import { Interceptor } from './core/interceptors/auth-interceptor';
import { ProjectService } from './core/services/project.service';
import { DatePipe } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import { MzModalModule, MzTooltipModule, MzButtonModule, MzInputModule, MzCollapsibleModule, MzRadioButtonModule } from 'ngx-materialize'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { LOCALE_ID } from '@angular/core';
import pt from '@angular/common/locales/pt';
import { AppRoutingModule } from './routing/app-routing.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  // entryComponents: [
  //   ModalErrorComponent
  // ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
