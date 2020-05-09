import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from 'src/app/core/services/task.service';
import { ProfileService } from 'src/app/core/services/profile.service';
import { NotifyComponent } from 'src/app/shared/components/notify/notify.component';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent implements OnInit {

  form: FormGroup = this.formBuilder.group({
    name: [null, [Validators.required]],
    description: [null, [Validators.required]],
    duration: [null, [Validators.required]],
    card: [null, [Validators.required]],
    previewedAt: [null],
    effort: [null],
    dailyEffort: [null],
    validDay: [null],
    warning: [null],
    allocated: [null],
    referenceDate: [null],
    style: [null],
    player: [null],
    projectId: [this.data.projectId]
  });
  loader: boolean = false;
  mainStyle = this.profileService.getAppMainColor();

  constructor(
    public dialogRef: MatDialogRef<TaskCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private _snackBar: MatSnackBar,
    private profileService: ProfileService
  ) { }

  ngOnInit() {
  }

  createTask() {
    this.loader = true;
    if (this.form.valid) {
      this.taskService.createTask(this.form.value).subscribe(
        (response) => {
          if (response.status == 0) {
            this._snackBar.openFromComponent(NotifyComponent, { data: { type: 'success', message: 'Projeto atualizado com sucesso!' }});
            this.dialogRef.close({confirm: true});
            this.loader = false;
            return;
          }
          this._snackBar.openFromComponent(NotifyComponent, { data: { type: 'error', message: 'Problemas ao editar o projeto, favor tentar novamente!' }});
          this.loader = false;
        }, (err) => {
          this.loader = false;
          this._snackBar.openFromComponent(NotifyComponent, { data: { type: 'error', message: 'Problemas ao editar o projeto, favor tentar novamente!' }});
      })
    } else {
      this.loader = false;
      this._snackBar.openFromComponent(NotifyComponent, { data: { type: 'error', message: 'Por favor, digite os campos corretamente!' }});
    }
  }

}
