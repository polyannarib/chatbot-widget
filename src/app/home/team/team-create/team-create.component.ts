import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MzModalService } from 'ngx-materialize';
import { LoadingService } from '../../shared/services/loading.service';
import { ModalSuccessComponent } from '../../modal/success/modal-success.component';
import { ModalErrorComponent } from '../../modal/error/modal-error.component';
import { TeamService } from '../../shared/services/team.service';

@Component({
  selector: 'app-team-create',
  templateUrl: './team-create.component.html',
  styleUrls: ['./team-create.component.css']
})
export class TeamCreateComponent implements OnInit {

  form: FormGroup = this.formBuilder.group({
    name: ['', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private modalService: MzModalService,
    private loadingService: LoadingService,
    private teamService: TeamService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.loadingService.showPreloader();
    if (this.form.valid) {
      this.teamService.save(this.form.value).subscribe(
        (response) => {
          this.loadingService.hidePreloader();
          this.modalService.open(ModalSuccessComponent);
        }, (err) => {
          this.loadingService.hidePreloader();
          this.modalService.open(ModalErrorComponent);
        }
      )
    } else {
      this.loadingService.hidePreloader();
      this.modalService.open(ModalErrorComponent);
    }
  }

}
