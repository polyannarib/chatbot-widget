import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from 'src/app/core/services/project.service';
import { NotifyComponent } from 'src/app/shared/components/notify/notify.component';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {

  form: FormGroup = this.formBuilder.group({
    id: [this.data.project.id, [Validators.required]],
    name: [this.data.project.name, [Validators.required]],
    code: [this.data.project.code],
    completed: [this.data.project.completed],
    predictEffort: [this.data.project.predictEffort],
    actualEffort: [this.data.project.actualEffort],
    predictConclusion: [this.data.project.predictConclusion],
    actualConclusion: [this.data.project.actualConclusion],
    expectedStyle: [this.data.project.expectedStyle],
    effortStyle: [this.data.project.effortStyle],
    status: [this.data.project.status],
    projectManager: [this.data.project.projectManager],
    customerOwner: [this.data.project.customerOwner],
    description: [this.data.project.description],
    identify: [this.data.project.identify],
  });

  loader: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ProjectEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  editProject() {
    this.loader = true;
    console.log('------- this.form -------');
    console.log(this.form);
    if (this.form.valid) {
      this.projectService.updateProject(this.form.value).subscribe(
        (response) => {
          if (response.status == 0) {
            this._snackBar.openFromComponent(NotifyComponent, 
              { data: { type: 'success', message: 'Projeto atualizado com sucesso!' }});
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
