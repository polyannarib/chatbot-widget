import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilterListPipe } from './filter.pipe';

@NgModule({
  imports: [
  ],
  declarations: [
    FilterListPipe
  ],
  exports: [
    FilterListPipe
  ]
})
export class PipesModule { }
