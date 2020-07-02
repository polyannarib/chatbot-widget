import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TaskService} from 'src/app/core/services/task.service';
import {ProfileService} from 'src/app/core/services/profile.service';
import {NotifyComponent} from 'src/app/shared/components/notify/notify.component';
import {CardFindComponent} from '../../card/card-find/card-find.component';
import {AttachmentComponent} from 'src/app/shared/components/modal/attachment/attachment.component';
import {ModalKysmartComponent} from '../modal-kysmart/modal-kysmart.component';
import {CardService} from 'src/app/core/services/card.service';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent implements OnInit {

  loader: boolean = false;
  kysmart: boolean = false;
  kysmartChildrenTasks: any = [];
  kysmartDateChildren: any;
  mainStyle = this.profileService.getAppMainColor();
  secoundStyle = this.profileService.getAppSecondaryColor();
  cards: any[] = [];
  type: any;
  types: any;
  createNewType: any = this.data.type ? (this.data.type.level + 1) : 1;
  attachment: any[] = [];
  taskCreate = this.data.type ? this.data.type.name : this.data.project.name;
  times: any;
  form: FormGroup = this.formBuilder.group({
    name: [null, [Validators.required]],
    description: [null],
    cards: [this.cards],
    expectedAt: [null],
    duration: [null],
    type: [null],
    links: [this.attachment],
    time: [null],
    parentId: [this.data.parentId],
    projectId: [this.data.project.id]
  });
  cardsTypes: any;
  classificationId: any;

  constructor(
    public dialogRef: MatDialogRef<TaskCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private _snackBar: MatSnackBar,
    private profileService: ProfileService,
    public dialog: MatDialog,
    private cardService: CardService
  ) { }

  ngOnInit() {
    this.getTypes();
    this.searchCard();
  }

  getTypeCreate(level, types?) {
    types.forEach(element => {
      if(element.level == level) {
        return element;
      }
    });
  }

  createTask() {
    this.loader = true;
    if (this.kysmart) {
      this.createFromKySmart();
    } else {
      if (this.form.valid) {
        if(this.type.definition == 'EXECUTAVEL') {
          const expectedAt = new Date(this.form.value.expectedAt).setHours(this.form.value.time);
          const setTimesStamp = new Date(expectedAt).getTime();
          this.form.value.expectedAt = setTimesStamp;
          this.form.value.links = this.attachment;
          this.form.value.cards = this.cards;
          // this.form.value.cards = this.cards.map(element => new Object({
          //   cardId: element.knowledgeId,
          //   classification: { id: this.classificationId }
          // }));
        }
        this.form.value.time = undefined;
        this.form.value.type = this.types.find( element => element.level == this.createNewType )
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

  createFromKySmart() {
    this.loader = true;
    if(this.type.definition === 'EXECUTAVEL') {
      const expectedAt = new Date(this.form.value.expectedAt).setHours(this.form.value.time);
      this.form.value.expectedAt = new Date(expectedAt).getTime();
      this.form.value.links = this.attachment;
    }
    this.form.value.time = undefined;
    this.form.controls.type.setValue(this.types.find( element => element.level === this.createNewType ));
    const dataMother = {
      name: this.form.controls.name.value,
      description: this.form.controls.description.value,
      projectId: this.form.controls.projectId.value,
      parentId: this.form.controls.parentId.value,
      type: this.form.controls.type.value
    };

    let firstChildren;
    let secondChildren;
    let thirdChildren;
    let fourthChildren;

    this.taskService.createTask(dataMother).subscribe(
      (responseCreateMother) => {
        if (responseCreateMother.status === 0) {
          console.log('Criou tarefa mae');
          const taskMother = responseCreateMother.object;
          this.kysmartChildrenTasks.map(taskToCreate => {
            if (taskToCreate.attributeId === 25) {
              firstChildren = {
                name: taskToCreate.registerItemDescription + ' - ' + this.form.controls.name.value,
                duration: taskToCreate.attributeHourValue,
                expectedAt: this.form.value.expectedAt,
                projectId: this.form.controls.projectId.value,
                parentId: taskMother.id,
                type: {id: 4, name: 'SUB-TAREFA', definition: 'EXECUTAVEL', level: 3, status: 'ACTIVATED'},
                cards: [],
                description: this.form.controls.description.value,
                links: []
              };
            } else if (taskToCreate.attributeId === 27) {
              secondChildren = {
                name: taskToCreate.registerItemDescription + ' - ' + this.form.controls.name.value,
                duration: taskToCreate.attributeHourValue,
                expectedAt: null,
                projectId: this.form.controls.projectId.value,
                parentId: taskMother.id,
                type: {id: 4, name: 'SUB-TAREFA', definition: 'EXECUTAVEL', level: 3, status: 'ACTIVATED'},
                cards: [],
                description: this.form.controls.description.value,
                links: []
              };
            } else if (taskToCreate.attributeId === 29) {
              thirdChildren = {
                name: taskToCreate.registerItemDescription + ' - ' + this.form.controls.name.value,
                duration: taskToCreate.attributeHourValue,
                expectedAt: null,
                projectId: this.form.controls.projectId.value,
                parentId: taskMother.id,
                type: {id: 4, name: 'SUB-TAREFA', definition: 'EXECUTAVEL', level: 3, status: 'ACTIVATED'},
                cards: [],
                description: this.form.controls.description.value,
                links: []
              };
            } else if (taskToCreate.attributeId === 32) {
              fourthChildren = {
                name: taskToCreate.registerItemDescription + ' - ' + this.form.controls.name.value,
                duration: taskToCreate.attributeHourValue,
                expectedAt: null,
                projectId: this.form.controls.projectId.value,
                parentId: taskMother.id,
                type: {id: 4, name: 'SUB-TAREFA', definition: 'EXECUTAVEL', level: 3, status: 'ACTIVATED'},
                cards: [],
                description: this.form.controls.description.value,
                links: []
              };
            }
          });
          console.log(firstChildren);
          this.taskService.createTask(firstChildren).subscribe(
            (responseCreateFirstChildren) => {
              if (responseCreateFirstChildren.status === 0) {
                console.log('Criou primeira tarefa filha ' + responseCreateFirstChildren.object.id);
                secondChildren.expectedAt = responseCreateFirstChildren.object.previewedAt;
                console.log(secondChildren);
                this.taskService.createTask(secondChildren).subscribe(
                  (responseCreateSecondChildren) => {
                    if (responseCreateSecondChildren.status === 0) {
                      console.log('Criou segunda tarefa filha ' + responseCreateSecondChildren.object.id);
                      thirdChildren.expectedAt = responseCreateSecondChildren.object.previewedAt;
                      console.log(thirdChildren);
                      this.taskService.createTask(thirdChildren).subscribe(
                        (responseCreateThirdChildren) => {
                          if (responseCreateThirdChildren.status === 0) {
                            console.log('Criou terceira tarefa filha ' + responseCreateThirdChildren.object.id);
                            fourthChildren.expectedAt = responseCreateThirdChildren.object.previewedAt;
                            console.log(fourthChildren);
                            this.taskService.createTask(thirdChildren).subscribe(
                              (responseCreateFourthChildren) => {
                                if (responseCreateFourthChildren.status === 0) {
                                  console.log('Criou quarta tarefa filha ' + responseCreateFourthChildren.object.id);
                                  this._snackBar.openFromComponent(NotifyComponent, { data: { type: 'success', message: 'Tarefas com sucesso!' }});
                                }
                              }
                            );
                            this._snackBar.openFromComponent(NotifyComponent, { data: { type: 'success', message: 'Tarefas com sucesso!' }});
                          }
                        }
                      );
                      this._snackBar.openFromComponent(NotifyComponent, { data: { type: 'success', message: 'Tarefas com sucesso!' }});
                    }
                  }
                );
                this._snackBar.openFromComponent(NotifyComponent, { data: { type: 'success', message: 'Tarefas com sucesso!' }});
              }
            }
          );
          this.loader = false;
          this.dialogRef.close({confirm: true});
          return;
        }
      }, (err) => {
        this.loader = false;
        this._snackBar.openFromComponent(NotifyComponent, { data: { type: 'error', message: 'Problemas ao criar tarefa mãe!' }});
      }
    );
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

  removeCard(card) {
    this.cards = this.cards.map(element => {
      if(element.knowledgeId != card.knowledgeId) {
        return element;
      }
    });
  }

  getTypes() {
    this.taskService.getTypesTask().subscribe(
      (response) => {
        this.types = response.object
        this.type = this.types.find( element => element.level == this.createNewType );
      }
    );
  }

  setAttachment() {
    const dataSend = {
      // task: this.data.task.id,
      nameComponent: 'taskCreate'
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

  searchCard() {
    this.cardService.searchComboCompetence().subscribe(
      (response) => {
        if(response.status == 0) {
          this.cardsTypes = response.object;
          return;
        }
        // console.log('deu ruim');
      }, (err) => {
        // console.log('deu ruim');
    })
  }

  // inputHidden() {
  //   const type = this.types.find( element => element.level == this.createNewType );

  //   console.log('-------------------')
  //   console.log('----- type -----')
  //   console.log(type)

  //   if(type.definition == "EXECUTAVEL") {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }

}
