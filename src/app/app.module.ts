import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppComponent } from './app.component';
import { DatePipe, registerLocaleData } from '@angular/common';
import { AppRoutingModule } from './routing/app-routing.module';

import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { HttpClient } from '@angular/common/http';

import pt from '@angular/common/locales/pt';

registerLocaleData(pt, 'pt-BR');

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    })
  ],
  providers: [
    DatePipe,
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
