import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { ProfileService } from 'src/app/core/services/profile.service';
import { TaskService } from 'src/app/core/services/task.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotifyComponent } from '../../notify/notify.component';

@Component({
  selector: 'app-attachment',
  templateUrl: './attachment.component.html',
  styleUrls: ['./attachment.component.css']
})
export class AttachmentComponent implements OnInit {

  loader: boolean = false;
  mainStyle = this.profileService.getAppMainColor();
  form: FormGroup = this.formBuilder.group({
    description: [null, [Validators.required]],
    url: [null, [Validators.required]],
    // type: this.formBuilder.group({
    //   id: [3]
    // })
  });

  constructor(
    public dialogRef: MatDialogRef<AttachmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private profileService: ProfileService,
    private taskService: TaskService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  sendAttachment() {
    if(this.form.valid) {
      this.form.value.type = { id : 3 };
      if(this.data.nameComponent == 'task') {
        this.taskService.setAttachment(this.data.task, this.form.value).subscribe(
          (response) => {
            if (response.status == 0) {
              this._snackBar.openFromComponent(NotifyComponent, { data: { type: 'success', message: 'Anexo adicionado com sucesso!' }});
              this.dialogRef.close(response.object);
              this.loader = false;
              return;
            }
            this._snackBar.openFromComponent(NotifyComponent, { data: { type: 'error', message: 'Problemas ao adicionar anexo, favor tentar novamente!' }});
            this.loader = false;
          }, (err) => {
            this.loader = false;
            this._snackBar.openFromComponent(NotifyComponent, { data: { type: 'error', message: 'Problemas ao adicionar anexo, favor tentar novamente!' }});
        })
      }
      if(this.data.nameComponent == 'taskCreate') {
        this.loader = false;
        this._snackBar.openFromComponent(NotifyComponent, { data: { type: 'success', message: 'Anexo adicionado!' }});
        this.dialogRef.close(this.form.value);
        return;
      }
    } else {
      this.loader = false;
      this._snackBar.openFromComponent(NotifyComponent, { data: { type: 'error', message: 'Por favor, digite os campos corretamente!' }});
    }
  }

}
