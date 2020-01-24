import { AuthGuardService } from './guards/auth-guard';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { AuthService } from './home/shared/services/auth.service';
import { LoginComponent } from './login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppComponent } from './app.component';
import { DatePipe, registerLocaleData } from '@angular/common';
import { AppRoutingModule } from './routing/app-routing.module';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import pt from '@angular/common/locales/pt';

registerLocaleData(pt, 'pt');

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    AuthService,
    AuthGuardService,
    AuthenticatedGuard,
    ProjectService,
    LoadingService,
    DatePipe,
    { provide: LOCALE_ID, useValue: 'pt' }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
