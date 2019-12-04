import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DepartmentService } from '../../shared/services/department.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalSuccessComponent } from '../../modal/success/modal-success.component';
import { ModalErrorComponent } from '../../modal/error/modal-error.component';
import { MzModalService } from 'ngx-materialize';

@Component({
  selector: 'app-department-create',
  templateUrl: './department-create.component.html',
  styleUrls: ['./department-create.component.css']
})
export class DepartmentCreateComponent implements OnInit {

  form: FormGroup = this.formBuilder.group({
    name: ['', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private departmentService: DepartmentService,
    private spinner : NgxSpinnerService,
    private modalService: MzModalService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.spinner.show('wait-login');
    if (this.form.valid) {
      this.departmentService.save(this.form.value).subscribe(
        (response) => {
          this.spinner.hide('wait-login');
          this.modalService.open(ModalSuccessComponent);
        }, (err) => {
          this.spinner.hide('wait-login');
          this.modalService.open(ModalErrorComponent);
        }
      )
    } else {
      this.spinner.hide('wait-login');
      this.modalService.open(ModalErrorComponent);
    }
  }

}
