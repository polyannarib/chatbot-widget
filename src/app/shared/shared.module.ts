import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';

import { FilterListPipe } from './pipe/filter.pipe';

import { CoreModule } from '../core/core.module';

import { HttpClient, HttpClientModule } from '@angular/common/http';

// NgxMaterial componentes importados no projeto
import { MzToastModule } from 'ngx-materialize';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component'

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    MzToastModule,
    HttpClientModule
  ],
  declarations: [
    FilterListPipe,
    HeaderComponent,
    FooterComponent
  ],
  exports: [
    FilterListPipe,
    HeaderComponent,
    FooterComponent,
    TranslateModule
  ]
})
export class SharedModule { }
