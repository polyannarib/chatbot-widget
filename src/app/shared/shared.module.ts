import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from '../core/core.module';

// Pipes do projeto
import { FilterListPipe } from './pipe/filter.pipe';

// Componentes criados no projeto
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component'

// NgxMaterial components importados
import { MzToastModule } from 'ngx-materialize';

// Material Angular components importados
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    HttpClientModule,
    MzToastModule,
    MatPaginatorModule,
    MatDialogModule
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
    TranslateModule,
    MatPaginatorModule,
    MatDialogModule
  ]
})
export class SharedModule { }
