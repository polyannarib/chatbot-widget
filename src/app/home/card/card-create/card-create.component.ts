import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CardService } from '../../shared/services/card.service';

import { MzModalService } from 'ngx-materialize';

import { LoadingService } from '../../shared/services/loading.service';

import { ModalSuccessComponent } from '../../modal/success/modal-success.component';
import { ModalErrorComponent } from '../../modal/error/modal-error.component';

@Component({
  selector: 'app-card-create',
  templateUrl: './card-create.component.html',
  styleUrls: ['./card-create.component.css']
})
export class CardCreateComponent implements OnInit {

  form: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    skillId: ['', Validators.required]
  });
  skills: any;
  card: any;

  constructor(
    private formBuilder: FormBuilder,
    private cardService: CardService,
    private loadingService: LoadingService,
    private modalService: MzModalService
  ) { }

  ngOnInit() {
    this.findSkills();
  }

  findSkills() {
    this.loadingService.showPreloader();
    this.cardService.findAllTasks().subscribe(
      (response) => {
        this.skills = response.object;
        this.loadingService.hidePreloader();
      }, (err) => {
        this.loadingService.hidePreloader();
      }
    )
  }

  onSubmit() {
    this.loadingService.showPreloader();
    if(this.form.valid) {
      console.warn(this.form.value);
      this.cardService.createCard(this.form.value).subscribe(
        (response) => {
          if(response.status == 0) {
            this.card = response.object;
            this.modalService.open(ModalSuccessComponent);
          }
          this.loadingService.hidePreloader();
        }, (err) => {
          this.modalService.open(ModalErrorComponent);
          this.loadingService.hidePreloader();
        }
      )
    } else {
      this.loadingService.hidePreloader();
      this.modalService.open(ModalErrorComponent);
    }
  }

}
