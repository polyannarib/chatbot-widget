import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { SucessComponent } from 'src/app/shared/components/modal/sucess/sucess.component';
import { ErrorComponent } from 'src/app/shared/components/modal/error/error.component';
import { DepartmentService } from 'src/app/core/services/department.service';

@Component({
  selector: 'app-department-create',
  templateUrl: './department-create.component.html',
  styleUrls: ['./department-create.component.css']
})
export class DepartmentCreateComponent implements OnInit {

  form: FormGroup = this.formBuilder.group({
    name: ['', Validators.required]
  });
  loader: boolean = false;
  department: any;

  constructor(
    private formBuilder: FormBuilder,
    private departmentService: DepartmentService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.loader = true;
    if (this.form.valid) {
      this.departmentService.save(this.form.value).subscribe(
        (response) => {
          if(response.status == 0) {
            this.department = response.object;
            this.loader = false;
            this.success('Departamento criado com sucesso!');
            return;
          }
          this.loader = false;
          this.error('Problemas ao criar o departamento');
        }, (err) => {
          this.loader = false;
          this.error('Problemas ao criar o departamento');
        }
      )
    } else {
      this.error('Formulário preenchido incorretamente');
      this.loader = false;
    }
  }
  
  success(dataText: string) {
    return this.dialog.open(SucessComponent, { width: '40vw', data: dataText });
  }

  error(dataText: string) {
    return this.dialog.open(ErrorComponent, { width: '40vw', data: dataText });
  }

}
