import { Component } from '@angular/core';
import { MzBaseModal, MzModalComponent } from 'ngx-materialize';

@Component({
  selector: 'app-modal-success',
  templateUrl: './modal-success.component.html',
  styleUrls: ['./modal-success.component.scss'],
})
export class ModalSuccessComponent extends MzBaseModal { }