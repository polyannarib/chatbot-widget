import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatDialog } from '@angular/material';
import { TaskService } from 'src/app/core/services/task.service';
import { ProfileService } from 'src/app/core/services/profile.service';
import { NotifyComponent } from 'src/app/shared/components/notify/notify.component';
import { CardFindComponent } from '../../card/card-find/card-find.component';
import { AttachmentComponent } from 'src/app/shared/components/modal/attachment/attachment.component';
import {ModalKysmartComponent} from "../modal-kysmart/modal-kysmart.component";

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {

  loader: boolean = false;
  kysmart: boolean = false;
  kysmartChildrenTasks: any = [];
  mainStyle = this.profileService.getAppMainColor();
  secoundStyle = this.profileService.getAppSecondaryColor();
  // card: any = (this.data.task.card != null) ? this.isCardSelect(this.data.task.card.cardId) : null;
  cardSelect: any = this.data.task.card;
  type: any = this.data.task.type;
  nameTaskParent = this.data.task.name;
  types: any;
  times = new Date(this.data.task.expectedAt).getHours();
  classificationId: any;
  cards: any[] = this.data.task.cards;
  form: FormGroup = this.formBuilder.group({
    id: [this.data.task.id],
    name: [this.data.task.name, [Validators.required]],
    description: [this.data.task.description],
    duration: [this.data.task.duration],
    cards: [this.cards],
    expectedAt: [this.data.task.expectedAt ? new Date(this.data.task.expectedAt) : null],
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
        console.log(this.form.value.expectedAt)
        console.log(new Date(this.form.value.expectedAt))
        console.log(new Date(this.form.value.expectedAt).setHours(this.form.value.time))
        const expectedAt = new Date(this.form.value.expectedAt).setHours(this.form.value.time);
        const setTimesStamp = new Date(expectedAt).getTime();
        console.log(setTimesStamp)
        this.form.value.expectedAt = setTimesStamp;
        this.form.value.cards = this.cards;
        // this.form.value.cards = this.cards.map(element => new Object({ 
        //   cardId: element.knowledgeId,
        //   classification: { id: this.classificationId }
        // }));
        // this.form.value.links = this.attachment;
        // this.form.value.cards = this.cards.map(element => new Object({ 
        //   cardId: element.knowledgeId,
        //   classification: { id: this.classificationId }
        // }));
      }
      // const expectedAt = new Date(this.form.value.expectedAt).getTime();
      // this.form.value.expectedAt = expectedAt;
      // if(this.cardSelect == null) {
      //   this.form.value.card = null
      // } else {
      //   this.form.value.card = this.card;
      // }
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

  createFromKySmart() {
    this.loader = true;
    if (this.type.definition == 'EXECUTAVEL') {
      const expectedAt = new Date(this.form.value.expectedAt).setHours(this.form.value.time);
      const setTimesStamp = new Date(expectedAt).getTime();
      this.form.value.expectedAt = setTimesStamp;
    }

    this.kysmartChildrenTasks.map(taskToCreate => {
      if (taskToCreate.attributeId === 25 ||
        taskToCreate.attributeId === 27 ||
        taskToCreate.attributeId === 29 ||
        taskToCreate.attributeId === 32) {
        const dataChildren = {
          name: taskToCreate.registerItemDescription + ' - ' + this.form.controls.name.value,
          duration: taskToCreate.attributeHourValue,
          expectedAt: this.form.value.expectedAt,
          projectId: this.form.controls.projectId.value,
          parentId: this.data.task.id,
          type: {id: 4, name: 'SUB-TAREFA', definition: 'EXECUTAVEL', level: 3, status: 'ACTIVATED'},
          card: this.form.value.card,
          description: this.form.controls.description.value,
          links: this.form.value.links
        };
        this.taskService.createTask(dataChildren).subscribe(
          (responseCreateChildren) => {
            if (responseCreateChildren.status === 0) {
              console.log('Criou tarefa filha ' + responseCreateChildren.object.id);
              console.log(responseCreateChildren);
              this._snackBar.openFromComponent(NotifyComponent, { data: { type: 'success', message: 'Tarefas com sucesso!' }});
              this.loader = false;
              return;
            }
          }
        );
      }
    });
    this.loader = false;
    this.dialogRef.close({confirm: true});
    return;
  }

  addCard() {
    const dataSend = this.cards;
    const dialogRef = this.dialog.open(CardFindComponent, {
      width: '400px',
      data: dataSend
    });
    dialogRef.afterClosed().subscribe(
    (result) => {
      if(result.confirm == true && result.card) {
        this.cards.push(result.card);
      }
    });
  }

  // addCard() {
  //   const dialogRef = this.dialog.open(CardFindComponent, {
  //     width: '400px',
  //   });
  //   dialogRef.afterClosed().subscribe(
  //   (result) => {
  //     if(result && result.knowledgeId) {        
  //       this.card = { cardId: result.knowledgeId };
  //       this.cardSelect = {
  //         cardName: result.name,
  //         id: result.knowledgeId
  //       };
  //     } else {
  //       this.card = null
  //       this.cardSelect = null;
  //     }
  //   });
  // }

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

  removeCard(card) {
    if(card.root) {
      this.taskService.cardRemoved(this.data.task.id, card.cardId).subscribe(
        (response) => {
          if (response.status == 0) {
            this.cards = response.object.cards;
          }
        });
    } else {
      this.cards.forEach((element, position) => {
        if(element.cardId == card.cardId) {
          this.cards.splice(position, this.cards.length)
        }
      });
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

  openCalculator() {
    const dialogRef = this.dialog.open(ModalKysmartComponent, {
      width: '1200px',
      // data: dataSend
    });
    dialogRef.afterClosed().subscribe(
      (result) => {
        if (result) {
          this.kysmart = true;
          this.kysmartChildrenTasks = result.data.object.childRegisters;
          console.log(result.data.object.attributeHourValue);

          // Esforço
          this.form.controls.duration.setValue(result.data.object.attributeHourValue);
        }
      });
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    const dateNow = new Date();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6 && d >= dateNow;
  }

}