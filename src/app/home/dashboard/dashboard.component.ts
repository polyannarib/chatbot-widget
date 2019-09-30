import { Component, OnInit, ElementRef, Type, ViewChild } from '@angular/core';
import { ProjectService } from 'src/app/home/shared/services/project.service';
import { PlayerService } from 'src/app/home/shared/services/player.service';
import { TaskService } from 'src/app/home/shared/services/task.service';
import { LoadingService } from 'src/app/home/shared/services/loading.service';
import { DatePipe } from '@angular/common';
import { MzModalComponent } from 'ngx-materialize';
import { ActivityModel } from '../shared/model/ActivityModel';
import { ProjectModel } from '../shared/model/ProjectModel';
import { AllocationModel } from '../shared/model/AllocationModel';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ConfirmModel } from '../shared/model/ConfirmModel';
import { MzModalService } from 'ngx-materialize';
import { ModalSuccessComponent } from '../modal/success/modal-success.component';

declare var jQuery: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild( 'success' )
  successModal: any;

  startDate: Date;
  endDate: Date;
  endDateProject: Date;
  players: Array<any>;
  player: any = {};
  projects: Array<any>;
  playerAllocation: AllocationModel = new AllocationModel();
  projectAllocation: AllocationModel = new AllocationModel();
  daysOfWeek14: Array<String> = [];
  daysOfWeek7: Array<String> = [];
  activityDetail: MzModalComponent;
  dailyActivity: ActivityModel = new ActivityModel();
  projectModel: ProjectModel = new ProjectModel();
  confirmModel: ConfirmModel = new ConfirmModel();
  isDesigning: Boolean = false;
  selectedAvailablePlayer: String;
  today: Date = new Date();
  fullWorkingDay: Boolean;
  designatePlayer: any;
  confirmDesignate: Boolean = false;
  editingTask: Number;
  editingPlayer: Number;
  editingDate: String;
  editingProject: any;
  projectModal: Boolean;
  reason: String;

  public modalOptions: Materialize.ModalOptions = {
    dismissible: true,
    opacity: .5,
    inDuration: 300,
    outDuration: 200,
    startingTop: '100%',
    endingTop: '10%',
    complete: () => { this.clean() }
  };

  dateClassPlayer = (d: Date) => {
    const date = d.getDate();
    const dateText = this.datePipe.transform(d, 'dd/MM/yyyy');
    return this.playerAllocation.full.includes(dateText)
      ? 'full-day' : 'unallocated';
  }

  dateClassProject = (d: Date) => {
    const dateText = this.datePipe.transform(d, 'dd/MM/yyyy');
    return this.projectAllocation.full.includes(dateText)
      ? 'full-day' : 'unallocated';
  }

  weekend = (d: Date): boolean => {
    const day = d.getDay();
    return day !== 0 && day !== 6;
  }

  constructor(
    private projectService: ProjectService,
    private playerService: PlayerService,
    private taskService: TaskService,
    private datePipe: DatePipe,
    private loadingService: LoadingService,
    private modalService: MzModalService ) {
  }

  ngOnInit() {
    let self = this;
    this.loadingService.showPreloader();
    this.loadCalendar();
    this.startDate = new Date();
    this.endDate = new Date();
    this.endDateProject = new Date();
    this.startDate.setDate(this.startDate.getDate() - 2);
    this.endDate.setDate(this.startDate.getDate() + 13);
    this.endDateProject.setDate(this.startDate.getDate() + 7);
    
    Promise.all([
      new Promise(function (resolve, reject) {
        let params = {
          "startDate": self.datePipe.transform(self.startDate, 'dd-MM-yyyy'),
          "page": 1,
          "pageSize": 10
        }
        self.playerService.findPlayers(params).subscribe(
          (response) => {
            self.players = response.object.list;
            resolve();
          }
        );
      }),
      new Promise(function (resolve, reject) {
        let params = {
          "startDate": self.datePipe.transform(self.startDate, 'dd-MM-yyyy'),
          "endDate": self.datePipe.transform(self.endDateProject, 'dd-MM-yyyy')
        }
        self.projectService.listProjects(params).subscribe(
          (response) => {
            self.projects = response.object.list;
            resolve();
          }
        );
      })
    ]).then(() => {
      self.loadingService.hidePreloader();
    });
  }

  loadCalendar() {
    let today = new Date();
    today.setDate(today.getDate() - 2);
    for (let i = 0; i < 13; i++) {
      this.daysOfWeek14.push(this.datePipe.transform(today, 'E'));
      if (i < 7) {
        this.daysOfWeek7.push(this.datePipe.transform(today, 'E'));
      }
      today.setDate(today.getDate() + 1);
    }
  }

  openModalProject(modal: MzModalComponent, id: Number, day: any, month: any, year: any) {

    let self = this;
    this.loadingService.showPreloader();
    this.projectModal = true;

    let date = new Date(year, month - 1, day);
    this.projectModel.dayText = this.datePipe.transform(date, 'EEEE');
    this.editingDate = day + '-' + month + '-' + year;
    this.editingProject = id;
    Promise.all([
      new Promise(function (resolve, reject) {

        self.taskService.findProjectTasks(id, day + '-' + month + '-' + year).subscribe(
          (response) => {
            const obj = response.object;
            console.log(obj);
            self.projectModel.projectName = obj.name;
            self.projectModel.date = self.editingDate;
            self.projectModel.dateFmt = day+'/'+month+'/'+year;
            self.projectModel.progress = obj.progress;
            self.projectModel.activities = obj.tasks;
            resolve();
          }
        );
      }),
      new Promise(function (resolve, reject) {
        let allocationParams = {};

        /*
        self.projectService.findAllocation(allocationParams).subscribe(
          (response) => {
            self.projectAllocation = response;
            resolve();
          }
        )*/
        resolve();
      })
    ]).then(() => {
      modal.openModal();
      self.loadingService.hidePreloader();
    })

  }

  openModalPlayer(modal: MzModalComponent, id: Number, day: any, month: any, year: any) {
    let self = this;
    this.loadingService.showPreloader();
    this.projectModal = false;
    this.editingPlayer = id;
    this.editingDate = day+'-'+month+'-'+year;
    let date = new Date(year, month - 1, day);
    this.dailyActivity.dayText = this.datePipe.transform(date, 'EEEE');

    Promise.all([
      new Promise(function (resolve, reject) {

        self.taskService.findTasks(id, day+'-'+month+'-'+year).subscribe(
          (response) => {
            const obj = response.object;
            console.log(obj);
            self.dailyActivity.playerId = obj.player.id;
            self.dailyActivity.playerName = obj.player.name;
            self.dailyActivity.date = self.editingDate;
            self.dailyActivity.dateFmt = day+'/'+month+'/'+year;
            self.dailyActivity.progress = obj.progress;
            self.dailyActivity.activities = obj.tasks;
            resolve();
          }
        )
      }),
      new Promise(function (resolve, reject) {
        let allocationParams = {
          "startDate": '23-09-2019',
          "endDate": '23-12-2019'
        }
        self.playerService.findAllocation(id, allocationParams).subscribe(
          (response) => {
            self.playerAllocation = response;
            resolve();
          }
        )
      })
    ]).then(() => {
      self.loadingService.hidePreloader();
      modal.openModal();
    });
  }

  designate(taskId) {
    if (!this.isDesigning) {
      this.isDesigning = true;

      this.loadingService.showPreloader();

      this.playerService.findDesignatePlayers(taskId).subscribe(
        (response) => {
          const obj = response.object;
          this.dailyActivity.playersRatedFiltered = obj.rated;
          this.dailyActivity.playersAvailableFiltered = obj.available;
          this.dailyActivity.playersRated = obj.rated;
          this.dailyActivity.playersAvailable = obj.available;
          this.loadingService.hidePreloader();

        }
      )
    } else {
      this.isDesigning = false;
    }
  }

  relocateTaskResource(
    modal: MzModalComponent, event: MatDatepickerInputEvent<Date>,
    playerId: Number, taskId: Number, taskName: String) {
    this.confirmModel.activityName = taskName;
    this.confirmModel.dateFrom = this.dailyActivity.day + '/' + this.dailyActivity.month + '/' + this.dailyActivity.year;
    this.confirmModel.dateTo = this.datePipe.transform(event.value, 'dd/MM/yyyy');
    this.confirmModel.taskId = taskId;
    this.confirmModel.playerId = playerId;
    let date1 = new Date(this.dailyActivity.year, this.dailyActivity.month - 1, this.dailyActivity.day);
    var date2 = event.value;
    this.confirmModel.delay = (date2.getTime() - date1.getTime()) / (1000 * 3600 * 24);

    if (this.playerAllocation.full.includes(this.confirmModel.dateTo)) {
      this.fullWorkingDay = true;
    } else {
      this.fullWorkingDay = false;
    }

    modal.openModal();
  }

  confirmRelocateTaskResource() {

  }

  onSearchChange(searchValue: string): void {
    this.dailyActivity.playersAvailableFiltered = this.dailyActivity.playersAvailable.filter(
      (curr) => {
        return curr.name.toUpperCase().includes(searchValue.toUpperCase());
      }
    )
    this.dailyActivity.playersRatedFiltered = this.dailyActivity.playersRated.filter(
      (curr) => {
        return curr.name.toUpperCase().includes(searchValue.toUpperCase());
      }
    )
  }

  activeConfirmation() {
    this.confirmDesignate = true;
  }

  doDesignation(modal: MzModalComponent, playerFrom: any, task: any) {
    this.editingTask = task;
    this.editingPlayer = this.designatePlayer.id;
    this.player = this.dailyActivity.playersAvailable.filter(
      (curr) => {
        return curr.id == this.designatePlayer.id;
      }
    )[0];

    modal.openModal();

  }

  confirmDesignTaskResource() {
    this.taskService.assignTask(this.editingTask, this.editingPlayer).subscribe(
      (response) => {
        this.dailyActivity.playersRatedFiltered = null;
        this.dailyActivity.playersAvailableFiltered = null;
        this.dailyActivity.playersRated = null;
        this.dailyActivity.playersAvailable = null;
        this.modalService.open( ModalSuccessComponent );
        this.taskService.findProjectTasks(this.editingProject, this.editingDate).subscribe(
          (response) => {
            const obj = response.object;
            this.projectModel.projectName = obj.name;
            this.projectModel.date = this.editingDate;
            this.projectModel.progress = obj.progress;
            this.projectModel.activities = obj.tasks;
          }
        );
      }
    )
  }

  finalize(modal: MzModalComponent, taskId) {
    this.editingTask = taskId;
    modal.openModal();
  }

  confirmFinalize(confirm: MzModalComponent) {
    this.taskService.finalize(this.editingTask).subscribe(
      (response) =>{
        if( this.projectModal ) {
          this.taskService.findProjectTasks(this.editingProject, this.editingDate).subscribe(
            (response) => {
              const obj = response.object;
              this.projectModel.projectName = obj.name;
              this.projectModel.date = this.editingDate;
              this.projectModel.progress = obj.progress;
              this.projectModel.activities = obj.tasks;
            }
          );
        } else {
          this.taskService.findTasks(this.editingPlayer, this.editingDate).subscribe(
            (response) => {
              const obj = response.object;
              this.dailyActivity.playerId = obj.player.id;
              this.dailyActivity.playerName = obj.player.name;
              this.dailyActivity.date = this.editingDate;
              this.dailyActivity.progress = obj.progress;
              this.dailyActivity.activities = obj.tasks;
            }
          )
        }
        this.modalService.open( ModalSuccessComponent );
      }
    );
  }

  removePlayer(modal: MzModalComponent, taskId) {
    this.editingTask = taskId;
    modal.openModal();
  }

  confirmRemovePlayer(confirm: MzModalComponent) {
    this.taskService.removePlayer(this.editingTask, this.reason).subscribe(
      (response) => {
        if( this.projectModal ) {
          this.taskService.findProjectTasks(this.editingProject, this.editingDate).subscribe(
            (response) => {
              const obj = response.object;
              this.projectModel.projectName = obj.name;
              this.projectModel.date = this.editingDate;
              this.projectModel.progress = obj.progress;
              this.projectModel.activities = obj.tasks;
            }
          );
        } else {
          this.taskService.findTasks(this.editingPlayer, this.editingDate).subscribe(
            (response) => {
              const obj = response.object;
              this.dailyActivity.playerId = obj.player.id;
              this.dailyActivity.playerName = obj.player.name;
              this.dailyActivity.date = this.editingDate;
              this.dailyActivity.progress = obj.progress;
              this.dailyActivity.activities = obj.tasks;
            }
          )
        }
        this.modalService.open( ModalSuccessComponent );
      }
    )
  }

  suspend(modal: MzModalComponent, taskId) {
    this.editingTask = taskId;
    modal.openModal();
  }

  confirmSuspend( confirm: MzModalComponent ) {
    this.taskService.suspend(this.editingTask, this.reason).subscribe(
      (response) => {
        if( this.projectModal ) {
          this.taskService.findProjectTasks(this.editingProject, this.editingDate).subscribe(
            (response) => {
              const obj = response.object;
              this.projectModel.projectName = obj.name;
              this.projectModel.date = this.editingDate;
              this.projectModel.progress = obj.progress;
              this.projectModel.activities = obj.tasks;
            }
          );
        } else {
          this.taskService.findTasks(this.editingPlayer, this.editingDate).subscribe(
            (response) => {
              const obj = response.object;
              this.dailyActivity.playerId = obj.player.id;
              this.dailyActivity.playerName = obj.player.name;
              this.dailyActivity.date = this.editingDate;
              this.dailyActivity.progress = obj.progress;
              this.dailyActivity.activities = obj.tasks;
            }
          )
        }
        this.modalService.open( ModalSuccessComponent );
      }
    )
  }

  clean() {
    this.confirmDesignate = false;
    this.playerAllocation = new AllocationModel();
    this.projectAllocation = new AllocationModel();
    this.dailyActivity = new ActivityModel();
    this.projectModel = new ProjectModel();
    this.confirmModel = new ConfirmModel();
    this.isDesigning = false;
  }

}
