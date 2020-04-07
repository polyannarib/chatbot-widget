import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { ProjectEditComponent } from '../project-edit/project-edit.component';
import { ProjectService } from 'src/app/core/services/project.service';
import { NotifyComponent } from 'src/app/shared/components/notify/notify.component';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css']
})
export class ProjectCreateComponent implements OnInit {

  form: FormGroup = this.formBuilder.group({
    name: [null, [Validators.required]],
    code: [null],
    completed: [null],
    predictEffort: [null],
    actualEffort: [null],
    predictConclusion: [null],
    actualConclusion: [null],
    expectedStyle: [null],
    effortStyle: [null],
    status: [null],
    projectManager: [null],
    customerOwner: [null],
    description: [null],
    identify: [null],
  });
  loader: boolean = false;
  mainStyle = this.profileService.getAppMainColor();

  constructor(
    public dialogRef: MatDialogRef<ProjectEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private _snackBar: MatSnackBar,
    private profileService: ProfileService
  ) { }

  ngOnInit() {
  }

  editProject() {
    this.loader = true;
    if (this.form.valid) {
      this.projectService.updateProject(this.form.value).subscribe(
        (response) => {
          if (response.status == 0) {
            this._snackBar.openFromComponent(NotifyComponent, 
              { data: { type: 'success', message: 'Projeto atualizado com sucesso!' }});
              this.dialogRef.close({confirm: true});
            this.loader = false;
            return;
          }
          this._snackBar.openFromComponent(NotifyComponent, 
            { data: { type: 'error', message: 'Problemas ao editar o projeto, favor tentar novamente!' }});
          this.loader = false;
        }, (err) => {
          this.loader = false;
          this._snackBar.openFromComponent(NotifyComponent, 
            { data: { type: 'error', message: 'Problemas ao editar o projeto, favor tentar novamente!' }});
      })
    } else {
      this.loader = false;
      this._snackBar.openFromComponent(NotifyComponent, 
        { data: { type: 'error', message: 'Por favor, digite os campos corretamente!' }});
    }
  }

}
