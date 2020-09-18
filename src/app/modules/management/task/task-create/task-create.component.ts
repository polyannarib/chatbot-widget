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
import {ModalRecurrenceComponent} from '../modal-recurrence/modal-recurrence.component';
import { DesignatePlayerComponent } from '../designate-player/designate-player.component';

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
  rule: any;
  form: FormGroup = this.formBuilder.group({
    name: [null, [Validators.required]],
    description: [null],
    cards: [this.cards],
    expectedAt: [null],
    duration: [null],
    type: [null],
    links: [this.attachment],
    time: [8],
    rule: [null],
    parentId: [this.data.parentId],
    projectId: [this.data.project.id],
    recurrence: [null],
    recurrenceEndAt: [null],
    playerToDesignate: [null]
  });
  cardsTypes: any;
  classificationId: any;
  designatedPlayer;

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
    this.getRules();
  }

  getTypeCreate(level, types?) {
    types.forEach(element => {
      if (element.level == level) {
        return element;
      }
    });
  }

  createTask() {
    this.loader = true;
    if (this.kysmart) {
      this.createFromKySmart();
    } else {
      // COM RECORRENCIA
      if (this.form.valid) {
        if (this.type.definition === 'EXECUTAVEL') {
          this.form.value.links = this.attachment;
          this.form.value.cards = this.cards;
          this.form.value.rule = this.rule;
        }
        this.form.value.type = this.types.find(element => element.level === this.createNewType);

        console.log('-------------------');

        this.checkPlayerAvailability();
      } else {
        this.loader = false;
        this._snackBar.openFromComponent(NotifyComponent, { data: { type: 'error', message: 'Por favor, digite os campos corretamente!' } });
      }
      // SEM RECORRENCIA
      // if (this.form.valid) {
      //   if (this.type.definition == 'EXECUTAVEL') {
      //     const expectedAt = new Date(this.form.value.expectedAt).setHours(this.form.value.time);
      //     const setTimesStamp = new Date(expectedAt).getTime();
      //     this.form.value.expectedAt = setTimesStamp;
      //     this.form.value.links = this.attachment;
      //     this.form.value.cards = this.cards;
      //     this.form.value.rule = this.rule;
      //     // this.form.value.cards = this.cards.map(element => new Object({
      //     //   cardId: element.knowledgeId,
      //     //   classification: { id: this.classificationId }
      //     // }));
      //   }
      //   this.form.value.time = undefined;
      //   this.form.value.type = this.types.find(element => element.level == this.createNewType)
      //
      //   console.log('-------------------')
      //   console.log(this.form.value)
      //
      //   this.taskService.createTask(this.form.value).subscribe(
      //     (response) => {
      //       if (response.status == 0) {
      //         this._snackBar.openFromComponent(NotifyComponent, { data: { type: 'success', message: 'Projeto atualizado com sucesso!' } });
      //         this.dialogRef.close({ confirm: true });
      //         this.loader = false;
      //         return;
      //       }
      //       this._snackBar.openFromComponent(NotifyComponent, { data: { type: 'error', message: 'Problemas ao criar a tarefa, favor tentar novamente!' } });
      //       this.loader = false;
      //     }, (err) => {
      //       this.loader = false;
      //       this._snackBar.openFromComponent(NotifyComponent, { data: { type: 'error', message: 'Problemas ao criar a tarefa, favor tentar novamente!' } });
      //     })
      // } else {
      //   this.loader = false;
      //   this._snackBar.openFromComponent(NotifyComponent, { data: { type: 'error', message: 'Por favor, digite os campos corretamente!' } });
      // }
    }
  }

  createFromKySmart() {
    this.loader = true;
    if (this.type.definition === 'EXECUTAVEL') {
      const expectedAt = new Date(this.form.value.expectedAt).setHours(8);
      const setTimesStamp = new Date(expectedAt).getTime();
      this.form.value.espectedAt = setTimesStamp;
      this.form.value.links = this.attachment;
    }
    this.form.value.time = undefined;
    this.form.controls.type.setValue(this.types.find(element => element.level === this.createNewType));
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
              const expectedAt = new Date(this.form.value.expectedAt).setHours(8);
              const setTimesStamp = new Date(expectedAt).getTime();

              firstChildren = {
                name: taskToCreate.registerItemDescription + ' - ' + this.form.controls.name.value,
                duration: taskToCreate.attributeHourValue,
                expectedAt: setTimesStamp,
                projectId: this.form.controls.projectId.value,
                parentId: taskMother.id,
                type: { id: 4, name: 'SUB-TAREFA', definition: 'EXECUTAVEL', level: 3, status: 'ACTIVATED' },
                cards: [],
                description: this.form.controls.description.value,
                links: [],
                rule: this.rule
              };
            } else if (taskToCreate.attributeId === 27) {
              secondChildren = {
                name: taskToCreate.registerItemDescription + ' - ' + this.form.controls.name.value,
                duration: taskToCreate.attributeHourValue,
                expectedAt: null,
                projectId: this.form.controls.projectId.value,
                parentId: taskMother.id,
                type: { id: 4, name: 'SUB-TAREFA', definition: 'EXECUTAVEL', level: 3, status: 'ACTIVATED' },
                cards: [],
                description: this.form.controls.description.value,
                links: [],
                rule: this.rule
              };
            } else if (taskToCreate.attributeId === 29) {
              thirdChildren = {
                name: taskToCreate.registerItemDescription + ' - ' + this.form.controls.name.value,
                duration: taskToCreate.attributeHourValue,
                expectedAt: null,
                projectId: this.form.controls.projectId.value,
                parentId: taskMother.id,
                type: { id: 4, name: 'SUB-TAREFA', definition: 'EXECUTAVEL', level: 3, status: 'ACTIVATED' },
                cards: [],
                description: this.form.controls.description.value,
                links: [],
                rule: this.rule
              };
            } else if (taskToCreate.attributeId === 32) {
              fourthChildren = {
                name: taskToCreate.registerItemDescription + ' - ' + this.form.controls.name.value,
                duration: taskToCreate.attributeHourValue,
                expectedAt: null,
                projectId: this.form.controls.projectId.value,
                parentId: taskMother.id,
                type: { id: 4, name: 'SUB-TAREFA', definition: 'EXECUTAVEL', level: 3, status: 'ACTIVATED' },
                cards: [],
                description: this.form.controls.description.value,
                links: [],
                rule: this.rule
              };
            }
          });
          console.log(firstChildren);
          this.taskService.createTask(firstChildren).subscribe(
            (responseCreateFirstChildren) => {
              if (responseCreateFirstChildren.status === 0) {
                console.log('Criou primeira tarefa filha ' + responseCreateFirstChildren.object.id);
                secondChildren.expectedAt = this.checkExpectedDate(responseCreateFirstChildren.object.previewedAt);
                console.log(secondChildren);
                this.taskService.createTask(secondChildren).subscribe(
                  (responseCreateSecondChildren) => {
                    if (responseCreateSecondChildren.status === 0) {
                      console.log('Criou segunda tarefa filha ' + responseCreateSecondChildren.object.id);
                      thirdChildren.expectedAt = this.checkExpectedDate(responseCreateSecondChildren.object.previewedAt);
                      console.log(thirdChildren);
                      this.taskService.createTask(thirdChildren).subscribe(
                        (responseCreateThirdChildren) => {
                          if (responseCreateThirdChildren.status === 0) {
                            console.log('Criou terceira tarefa filha ' + responseCreateThirdChildren.object.id);
                            fourthChildren.expectedAt = this.checkExpectedDate(responseCreateThirdChildren.object.previewedAt);
                            console.log(fourthChildren);
                            this.taskService.createTask(fourthChildren).subscribe(
                              (responseCreateFourthChildren) => {
                                if (responseCreateFourthChildren.status === 0) {
                                  console.log('Criou quarta tarefa filha ' + responseCreateFourthChildren.object.id);
                                  this._snackBar.openFromComponent(NotifyComponent, { data: { type: 'success', message: 'Tarefas criadas com sucesso!' } });
                                  this.loader = false;
                                  this.dialogRef.close({ confirm: true });
                                  return;
                                }
                              }
                            );
                          }
                        }
                      );
                    }
                  }
                );
              }
            }
          );
        }
      }, (err) => {
        this.loader = false;
        this._snackBar.openFromComponent(NotifyComponent, { data: { type: 'error', message: 'Problemas ao criar tarefa mãe!' } });
      }
    );
  }

  checkExpectedDate(value) {
    let date = new Date(value);

    if (date.getHours() == 18) {
      date.setDate(date.getDate() + 1);
      date.setHours(8);
    }

    return date.getTime();
  }

  addCard() {
    const dataSend = this.cards;
    const dialogRef = this.dialog.open(CardFindComponent, {
      width: '400px',
      data: dataSend
    });
    dialogRef.afterClosed().subscribe(
      (result) => {
        if (result.confirm == true && result.card) {
          this.cards.push(result.card);
        }
      }
    );
  }

  removeCard(card) {
    this.cards = this.cards.map(element => {
      if (element.knowledgeId != card.knowledgeId) {
        return element;
      }
    });
  }

  getTypes() {
    this.taskService.getTypesTask().subscribe(
      (response) => {
        this.types = response.object
        this.type = this.types.find(element => element.level == this.createNewType);
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
        if (result.attachmentValid == true) {
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
          this.kysmartChildrenTasks = result.data.object.childRegisters[0].childRegisters;
          // Esforço
          this.form.controls.duration.setValue(result.data.object.attributeHourValue);
        }
      });
  }

  checkPlayerAvailability() {
    const expectedAt = new Date(this.form.value.expectedAt).setHours(this.form.value.time);
    const endAt = new Date(this.form.value.recurrenceEndAt).setHours(this.form.value.time);
    this.form.value.expectedAt = new Date(expectedAt).getTime();
    this.form.value.recurrenceEndAt = new Date(endAt).getTime();

    this.loader = true;
    let messageError;
    let hasError = false;
    const firstDate = new Date(this.form.value.expectedAt);
    let secondDate = new Date(this.form.value.recurrenceEndAt);
    const differenceTime = secondDate.getTime() - firstDate.getTime();
    const listOfDateToEvaluate = [];

    if (this.form.value.duration > 8 && this.form.value.recurrence.toLowerCase() !== 'não se repete') {
      hasError = true;
      messageError = 'Para atividades recorrentes, não se deve ultrapassar 8 horas de esforço.';
    }

    if (this.designatedPlayer === null || this.designatedPlayer === undefined) {
      hasError = true;
      messageError = 'Selecione um player.';
    }

    switch (this.form.value.recurrence.toLowerCase()) {
      case 'não se repete':
        secondDate = firstDate;
        break;

      case 'todos os dias da semana':
        const differenceDays = differenceTime / (1000 * 3600 * 24);

        if (differenceDays > 30) {
          hasError = true;
          messageError = 'A diferença entre a data de inicio e a data de término não pode exceder 30 dias.';
        }
        break;

      case 'semanal':
        let diff = differenceTime / 1000;
        diff /= (60 * 60 * 24 * 7);
        const differenceWeeks = Math.abs(Math.round(diff));

        if (differenceWeeks > 5) {
          hasError = true;
          messageError = 'A diferença entre a data de inicio e a data de término não pode exceder 5 semanas.';
        }
        break;

      case 'mensal':
        let months;
        months = (secondDate.getFullYear() - firstDate.getFullYear()) * 12;
        months -= firstDate.getMonth();
        months += secondDate.getMonth();
        const differenceMonths = months <= 0 ? 0 : months;

        if (differenceMonths > 3) {
          hasError = true;
          messageError = 'A diferença entre a data de inicio e a data de término não pode exceder 3 meses.';
        }
        break;

      default:
        hasError = true;
        messageError = 'Escolha a recorrência.';
        break;
    }

    if (hasError) {
      this.loader = false;
      this._snackBar.openFromComponent(NotifyComponent, { data: { type: 'error', message: messageError } });
      return;
    } else {
      let currentDate = firstDate;
      while (currentDate.getTime() !== secondDate.getTime()) {
        const weekDay = currentDate.toLocaleString('default', { weekday: 'long' });
        if (weekDay !== 'sábado' && weekDay !== 'domingo' && weekDay !== 'saturday' && weekDay !== 'sunday') {
          listOfDateToEvaluate.push(currentDate.getTime());
        }
        currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
      }
      const finalDay = secondDate.toLocaleString('default', { weekday: 'long' });
      if (finalDay !== 'sábado' && finalDay !== 'domingo' && finalDay !== 'saturday' && finalDay !== 'sunday') {
        listOfDateToEvaluate.push(secondDate.getTime());
      }

      const dataToSend = {
        taskDates: listOfDateToEvaluate,
        player: {
          id: this.designatedPlayer.personId
        },
        task: {
          duration: this.form.value.duration
        }
      };

      this.taskService.checkPlayerToDesignateAvailability(dataToSend).subscribe(
        (response) => {
          console.log(response);
          if (response.status === 0) {
            this.loader = false;
            console.log('deu certo');
            console.log(response);

            const availableList = response.object;

            const onlyInAv = listOfDateToEvaluate.filter(this.comparerList(availableList));
            const onlyInUn = availableList.filter(this.comparerList(listOfDateToEvaluate));

            const unavailableList = onlyInUn.concat(onlyInAv);
            this.openConfirmationRecurrence({unavailableList, availableList, player: this.designatedPlayer});
          } else {
            this.loader = false;
            if (response.message === 'PLAYER_NOT_FOUND') {
              this._snackBar.openFromComponent(NotifyComponent, { data: { type: 'error', message: 'Algum player deve ser selecionado.' } });
            }
            // tslint:disable-next-line:max-line-length
            this._snackBar.openFromComponent(NotifyComponent, { data: { type: 'error', message: 'Erro ao criar tarefa com recorrência.' } });
          }
        }, (error) => {
          this.loader = false;
          this._snackBar.openFromComponent(NotifyComponent, { data: { type: 'error', message: 'Erro ao criar tarefa com recorrência.' } });
        }
      );
    }
  }

  openConfirmationRecurrence(dataSend) {
    const dialogRef = this.dialog.open(ModalRecurrenceComponent, {
      width: '500px',
      data: dataSend
    });
    dialogRef.afterClosed().subscribe(
      (result) => {
        console.log(result);
        if (result && result.confirm) {
          this.loader = true;
          const dataToSend = {
            taskDates: dataSend.availableList,
            player: {
              id: dataSend.player.personId
            },
            task: {
              projectId: this.form.value.projectId,
              name: this.form.value.name,
              description: this.form.value.description,
              duration: this.form.value.duration,
              rule: {
                id: this.rule.id
              },
              cards: this.form.value.cards,
              links: this.form.value.links,
              parentId: this.form.value.parentId
            }
          };

          this.taskService.createRecurrenceTask(dataToSend).subscribe(
            (response) => {
              if (response.status === 0) {
                this.loader = false;
                this._snackBar.openFromComponent(NotifyComponent, { data: { type: 'success', message: 'Tarefas com recorrência criadas com sucesso!' } });
                this.dialogRef.close({ confirm: true });
                return;
              } else {
                this.loader = false;
                this._snackBar.openFromComponent(NotifyComponent, { data: { type: 'error', message: 'Erro ao criar tarefa com recorrência.' } });
              }
            }, (error) => {
              this.loader = false;
              this._snackBar.openFromComponent(NotifyComponent, { data: { type: 'error', message: 'Erro ao criar tarefa com recorrência.' } });
            }
          );
        }
      });
  }

  comparerList(otherArray) {
    return (current) => {
      return otherArray.filter((other) => {
        return other === current;
      }).length === 0;
    };
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
        if (response.status === 0) {
          this.cardsTypes = response.object;
          return;
        }
        // console.log('deu ruim');
      }, (err) => {
        // console.log('deu ruim');
      })
  }

  getRules() {
    console.log('Entrou dentro do getRules')
    const data = {
      name: 'ATIVIDADE'
    }
    this.taskService.getRules(data).subscribe(
      (response) => {
        if (response.status == 0) {
          this.rule = response.object.find(element => element.name == 'ATIVIDADE');
          console.log('**************************')
          console.log('--------------------------')
          console.log(response.object)
          console.log(this.rule)
          // this.cardsTypes = response.object;
          return;
        }
        // console.log('deu ruim');
      }, (err) => {
        // console.log('deu ruim');
      })
  }

  openDesignatePlayer() {
    const dialogRef = this.dialog.open(DesignatePlayerComponent, {
      width: '450px',
    });
    dialogRef.afterClosed().subscribe(
      result => {
        console.log(result)
        if (result) {
          this.designatedPlayer = result;
        }
      }
    )
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
