import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatDialog } from '@angular/material';
import { TaskService } from 'src/app/core/services/task.service';
import { ProfileService } from 'src/app/core/services/profile.service';
import { NotifyComponent } from 'src/app/shared/components/notify/notify.component';
import { CardFindComponent } from '../../card/card-find/card-find.component';
import { AttachmentComponent } from 'src/app/shared/components/modal/attachment/attachment.component';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {

  loader: boolean = false;
  mainStyle = this.profileService.getAppMainColor();
  secoundStyle = this.profileService.getAppSecondaryColor();
  card: any = (this.data.task.card != null) ? this.isCardSelect(this.data.task.card.cardId) : null;
  cardSelect: any = this.data.task.card;
  type: any = this.data.task.type;
  nameTaskParent = this.data.task.name;
  types: any;
  times = new Date(this.data.task.expectedAt).getHours();
  form: FormGroup = this.formBuilder.group({
    id: [this.data.task.id],
    name: [this.data.task.name, [Validators.required]],
    description: [this.data.task.description],
    duration: [this.data.task.duration],
    card: [this.card],
    expectedAt: [new Date(this.data.task.expectedAt)],
    time: [new Date(this.data.task.expectedAt).getHours()],
    effort: [this.data.task.effort],
    dailyEffort: [this.data.task.dailyEffort],
    validDay: [this.data.task.validDay],
    warning: [this.data.task.warning],
    allocated: [this.data.task.allocated],
    referenceDate: [this.data.task.referenceDate],
    style: [this.data.task.style],
    player: [this.data.task.player],
    type: [this.data.task.type],
    parentId: [this.data.task.parentId],
    links: [this.data.task.links],
    projectId: [this.data.project.id]
  });

  constructor(
    public dialogRef: MatDialogRef<TaskDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private _snackBar: MatSnackBar,
    private profileService: ProfileService,
    public dialog: MatDialog
  ) { }

  ngOnInit() { }

  isCardSelect(id) {
    if(!!id || id != null || id != undefined) {
      return { cardId: id };
    } else {
      return null
    }
  }

  // getTypeCreate(level, types) {
  //   types.forEach(element => {
  //     if(element.level == level) {
  //       return element;
  //     }
  //   });
  // }

  createTask() {
    this.loader = true;
    if (this.form.valid) {
      if(this.form.value.expectedAt != null) {
        const expectedAt = new Date(this.form.value.expectedAt).setHours(this.form.value.time);
        const setTimesStamp = new Date(expectedAt).getTime();
        this.form.value.expectedAt = setTimesStamp;
        // this.form.value.links = this.attachment;
      }
      // const expectedAt = new Date(this.form.value.expectedAt).getTime();
      // this.form.value.expectedAt = expectedAt;
      if(this.cardSelect == null) {
        this.form.value.card = null
      } else {
        this.form.value.card = this.card;
      }
      // this.form.value.type = this.getTypeCreate(this.data.nodeType.level + 1, this.types);
      // this.form.value.type = this.types.find( element => element.level == this.data.nodeType.level + 1 )
      this.form.value.time = undefined;
      this.taskService.createTask(this.form.value).subscribe(
        (response) => {
          if (response.status == 0) {
            // if(response.object == "TASK_CANT_BE_CHANGE") {
            //   this.dialogRef.close({confirm: true});
            //   this.loader = false;
            //   return;
            // }
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
      if(result && result.knowledgeId) {        
        this.card = { cardId: result.knowledgeId };
        this.cardSelect = {
          cardName: result.name,
          id: result.knowledgeId
        };
        // this.form.value.card = { cardId: this.card.knowledgeId };
      } else {
        this.card = null
        this.cardSelect = null;
      }
    });
  }

  setAttachment() {
    const dataSend = {
      task: this.data.task.id,
      nameComponent: 'task'
    }
    const dialogRef = this.dialog.open(AttachmentComponent, {
      width: '400px',
      data: dataSend
    });
    dialogRef.afterClosed().subscribe(
    (result) => {
      if(result.attachmentValid == true) {
        this.form.value.links.push(result.attachment);
      }
    });
  }

  removeCard() {
    if(this.cardSelect) {
      this.cardSelect = null;
    }
  }

  removeAttachment(attachment) {
    this.form.value.links = this.form.value.links.map(element => element.description != attachment.description );
  }

  isCard() {
    if(!!this.cardSelect || this.cardSelect == null || this.cardSelect == undefined) {
      return false;
    }
    return true;
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    const dateNow = new Date();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6 && d >= dateNow;
  }

}
