import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: CardComponent,
      }
    ])
  ]
})
export class CardModule { }
