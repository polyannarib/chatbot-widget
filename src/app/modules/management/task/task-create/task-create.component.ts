import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatDialog } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from 'src/app/core/services/task.service';
import { ProfileService } from 'src/app/core/services/profile.service';
import { NotifyComponent } from 'src/app/shared/components/notify/notify.component';
import { CardFindComponent } from '../../card/card-find/card-find.component';
import { AttachmentComponent } from 'src/app/shared/components/modal/attachment/attachment.component';
import { ModalKysmartComponent } from '../modal-kysmart/modal-kysmart.component';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent implements OnInit {

  loader: boolean = false;
  kysmart: boolean = false;
  kysmartChildrenTasks: any = [];
  mainStyle = this.profileService.getAppMainColor();
  secoundStyle = this.profileService.getAppSecondaryColor();
  card: any;
  type: any;
  types: any;
  createNewType: any = this.data.type ? (this.data.type.level + 1) : 1;
  attachment = [];
  taskCreate = this.data.type ? this.data.type.name : this.data.project.name;
  times: any;
  form: FormGroup = this.formBuilder.group({
    name: [null, [Validators.required]],
    description: [null],
    card: [this.card],
    expectedAt: [null],
    duration: [null],
    type: [null],
    links: [null],
    time: [null],
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

  getTypeCreate(level, types?) {
    types.forEach(element => {
      if(element.level == level) {
        return element;
      }
    });
  }

  createTask() {
    this.loader = true;
    if (this.form.valid) {
      if(this.type.definition == 'EXECUTAVEL') {
        const expectedAt = new Date(this.form.value.expectedAt).setHours(this.form.value.time);
        const setTimesStamp = new Date(expectedAt).getTime();
        this.form.value.expectedAt = setTimesStamp;
        this.form.value.links = this.attachment;
      }
      this.form.value.time = undefined;
      // this.form.value.type = this.getTypeCreate(this.data.nodeType.level + 1, this.types);
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

  createFromKySmart() {
    this.loader = true;
    const data = {
      name: this.form.controls.name.value,
      description: this.form.controls.description.value,
    };

    this.taskService.createTask(data).subscribe(
      (responseCreateMother) => {
        if (responseCreateMother.status === 0) {
          this.taskService.getTasksByProject(this.form.controls.projectId.value).subscribe(
            (responseTaskMother) => {
              if (responseTaskMother.status === 0) {
                const tasks = responseTaskMother.object;
                tasks.map(task => {
                  if (task.name === this.form.controls.name.value) {
                    this.kysmartChildrenTasks.map(taskToCreate => {
                      if (taskToCreate.attributeId === 25 ||
                          taskToCreate.attributeId === 27 ||
                          taskToCreate.attributeId === 29 ||
                          taskToCreate.attributeId === 32) {
                        const dataChildren = {
                          name: taskToCreate.registerItemDescription + ' - ' + this.form.controls.name.value,
                          duration: taskToCreate.attributeHourValue,
                          expectedAt: this.form.value.expectedAt + taskToCreate.attributeHourValue
                        };
                        this.taskService.createTask(dataChildren).subscribe(
                          (responseCreateChildren) => {
                            if (responseCreateChildren.status === 0) {
                              console.log(responseCreateChildren);
                            }
                          }
                        );
                      }
                    });
                    this.loader = false;
                    console.log('tasks filhas criadas');
                    return;
                  } else {
                    this.loader = false;
                    this._snackBar.openFromComponent(NotifyComponent, { data: { type: 'error', message: 'Problemas ao pesquisar tarefa mãe!' }});
                  }
                });
              }
            }, (err) => {
              this.loader = false;
            }
          );
        }
      }, (err) => {
        this.loader = false;
        this._snackBar.openFromComponent(NotifyComponent, { data: { type: 'error', message: 'Problemas ao criar tarefa mãe!' }});
      }
    );
  }

  addCard() {
    // const dataSend = {
    //   project: this.data.project
    // }
    const dialogRef = this.dialog.open(CardFindComponent, {
      width: '600px',
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
      (response) => {
        this.types = response.object
        this.type = this.types.find( element => element.level == this.createNewType );
      }
    );
  }

  setAttachment() {
    const dataSend = {
      nameComponent: 'taskCreate'
    }
    const dialogRef = this.dialog.open(AttachmentComponent, {
      width: '400px',
      data: dataSend
    });
    dialogRef.afterClosed().subscribe(
    (result) => {
      if(result) {
        if(result.attachmentValid == true) {
          this.form.value.links.push(result.attachment);
        }
      }
    })
  }

  openCalculator() {
    const dialogRef = this.dialog.open(ModalKysmartComponent, {
      width: '1200px',
      // data: dataSend
    });
    dialogRef.afterClosed().subscribe(
      (result) => {
        if (result) {
          console.log(result.data);
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
