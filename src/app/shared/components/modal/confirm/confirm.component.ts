import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { ProfileService } from 'src/app/core/services/profile.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ProjectService } from 'src/app/core/services/project.service';
import { NotifyComponent } from '../../notify/notify.component';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  mainStyle = this.profileService.getAppMainColor();
  form: FormGroup = this.formBuilder.group({
    workgroup: [null, [Validators.required]],
    projectManager: [null, [Validators.required]]
  });
  listWorkgroup: any;
  listManagers: any;

  constructor(
    public dialogRef: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private profileService: ProfileService,
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.findAllWorkgroups();
    this.findAllMasters();
  }

  findAllWorkgroups() {
    this.projectService.getAllWorkgroups().subscribe(
      (response) => {
        if (response.status == 0) {
          this.listWorkgroup = response.object;
          return;
        }
      }, (err) => {
        this._snackBar.openFromComponent(NotifyComponent, 
          { data: { type: 'error', message: 'Ops, aconteceu algum problema. Contate um administrador' }});
      }
    );
  }

  findAllMasters() {
    this.projectService.getAllMasters().subscribe(
      (response) => {
        if (response.status == 0) {
          this.listManagers = response.object;
          return;
        }
      }, (err) => {
        this._snackBar.openFromComponent(NotifyComponent, 
          { data: { type: 'error', message: 'Ops, aconteceu algum problema. Contate um administrador' }});
      }
    );
  }

  confirm() {
    if(this.form.valid) {
      this.dialogRef.close({
        confirm: true,
        workgroupId: this.form.value.workgroup,
        managerId: this.form.value.projectManager
      });
    } else {
      this._snackBar.openFromComponent(NotifyComponent, 
        { data: { type: 'error', message: 'Problemas ao adicionar projeto' }});
    }
  }

}
