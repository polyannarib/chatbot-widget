import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatDialog } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from 'src/app/core/services/task.service';
import { ProfileService } from 'src/app/core/services/profile.service';
import { NotifyComponent } from 'src/app/shared/components/notify/notify.component';
import { CardFindComponent } from '../../card/card-find/card-find.component';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent implements OnInit {

  loader: boolean = false;
  mainStyle = this.profileService.getAppMainColor();
  secoundStyle = this.profileService.getAppSecondaryColor();
  card: any;
  type: any;
  types: any;
  form: FormGroup = this.formBuilder.group({
    name: [null, [Validators.required]],
    description: [null, [Validators.required]],
    card: [this.card],
    previewedAt: [null],
    effort: [null, [Validators.required]],
    type: [null],
    parentId: [this.data.parentId],
    projectId: [this.data.project.id]
  });

  constructor(
    public dialogRef: MatDialogRef<TaskCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private _snackBar: MatSnackBar,
    private profileService: ProfileService,
    public dialog: MatDialog
  ) { }

  ngOnInit() { 
    this.getTypes();
  }

  getTypeCreate(level, types) {
    types.forEach(element => {
      if(element.level == level) {
        return element;
      }
    });
  }

  createTask() {
    this.loader = true;
    if (this.form.valid) {
      const previewedAt = new Date(this.form.value.previewedAt).getTime();
      this.form.value.previewedAt = previewedAt;
      // this.form.value.type = this.getTypeCreate(this.data.nodeType.level + 1, this.types);
      this.form.value.type = this.types.find( element => element.level == this.data.nodeType.level + 1 )
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

  addCard() {
    // const dataSend = {
    //   project: this.data.project
    // }
    const dialogRef = this.dialog.open(CardFindComponent, {
      width: '400px',
      // data: dataSend
    });
    dialogRef.afterClosed().subscribe(
    (result) => {
      if(result) {
        this.card = result;
        this.form.value.card = { cardId: this.card.knowledgeId };
      }
    });
  }

  removeCard() {
    if(this.card) {
      this.card = null;
    }
  }

  getTypes() {
    this.taskService.getTypesTask().subscribe(
      (response) => { this.types = response.object }
    );
  }
  
}