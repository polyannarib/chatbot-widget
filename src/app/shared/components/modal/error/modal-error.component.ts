import { Component } from '@angular/core';
import { MzBaseModal, MzModalComponent } from 'ngx-materialize';

@Component({
  selector: 'app-modal-error',
  templateUrl: './modal-error.component.html',
  styleUrls: ['./modal-error.component.scss'],
})
export class ModalErrorComponent extends MzBaseModal { }