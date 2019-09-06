import { Component, OnInit, ElementRef, ViewEncapsulation } from '@angular/core';
import { ChartOptions } from 'chart.js';
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

declare var jQuery: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  startDate: Date;
  endDate: Date;
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
  busy: Boolean = false;
  designatePlayer: any;
  confirmDesignate: Boolean = false;

  private graphics: Array<any> = [];
  private chartColors: Array<any> = [];
  private chartOptions: ChartOptions;

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
    const date = d.getDate();
    const dateText = this.datePipe.transform(d, 'dd/MM/yyyy');
    return this.projectAllocation.full.includes(dateText)
      ? 'full-day' : 'unallocated';
  }

  weekend = (d: Date): boolean => {
    const day = d.getDay();
    return day !== 0 && day !== 6;
  }

  constructor(
    private el: ElementRef,
    private projectService: ProjectService,
    private playerService: PlayerService,
    private taskService: TaskService,
    private datePipe: DatePipe,
    private loadingService: LoadingService) {
  }

  ngOnInit() {
    let self = this;
    this.loadingService.showPreloader();
    this.loadCalendar();
    this.startDate = new Date();
    this.endDate = new Date();
    this.startDate.setDate(this.startDate.getDate() - 2);
    this.endDate.setDate(this.startDate.getDate() + 14);
    Promise.all([
      new Promise(function (resolve, reject) {
        let params = {

        }
        self.playerService.findPlayers(params).subscribe(
          (response) => {
            self.players = response;
            resolve();
          }
        );
      }),
      new Promise(function (resolve, reject) {
        self.projectService.listProjects().subscribe(
          (response) => {
            self.projects = response;
            resolve();
          }
        );
      })
    ]).then(() => {
      self.loadingService.hidePreloader();
    });

    jQuery(this.el.nativeElement).find('.collapsible').collapsible();
    var main = getComputedStyle(document.body).getPropertyValue('--graph-main-color');
    var second = getComputedStyle(document.body).getPropertyValue('--graph-color');
    this.chartColors.push({
      backgroundColor: [main, second],
      pointBackgroundColor: [main, second]
    })
    this.chartOptions = {
      responsive: true,
    };

    // Para teste
    this.graphics.push({
      title: "Projeto no prazo",
      data: [5, 2],
      labels: ['Projeto no prazo', 'Projeto atrasado'],
      type: 'pie'
    })
    this.graphics.push({
      title: "Recurso utilizado",
      data: [5, 20],
      labels: ['Recurso utilizado', 'Recurso não utilizado'],
      type: 'pie'
    })
    this.graphics.push({
      title: "Cards Utilizados",
      data: [15, 2],
      labels: ['JS', 'Java'],
      type: 'pie'
    })
    this.graphics.push({
      title: "Projeto alterado",
      data: [15, 5],
      labels: ['Projetos alterados', 'Projeto não alterados'],
      type: 'pie'
    })
    this.graphics.push({
      title: "Recurso disponível",
      data: [15, 2],
      labels: ['Recurso disponível', 'Recurso não disponível'],
      type: 'pie'
    })
    this.graphics.push({
      title: "Projetos no prazo",
      data: [15, 2],
      labels: ['Projetos no prazo', 'Projetos atrasados'],
      type: 'pie'
    })
  }

  loadCalendar() {
    let today = new Date();
    today.setDate(today.getDate() - 2);
    for (let i = 0; i < 14; i++) {
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

    let date = new Date(year, month - 1, day);
    this.projectModel.dayText = this.datePipe.transform(date, 'EEEE');

    Promise.all([
      new Promise(function (resolve, reject) {
        let params = {};

        self.taskService.findProjectTasks(params).subscribe(
          (response) => {
            self.projectModel.projectName = response.name;
            self.projectModel.day = day;
            self.projectModel.month = month;
            self.projectModel.progress = response.progress;
            self.projectModel.activities = response.activities;
            resolve();
          }
        );
      }),
      new Promise(function (resolve, reject) {
        let allocationParams = {};

        self.projectService.findAllocation(allocationParams).subscribe(
          (response) => {
            self.projectAllocation = response;
            resolve();
          }
        )
      })
    ]).then(() => {
      modal.openModal();
      self.loadingService.hidePreloader();
    })

  }

  openModalPlayer(modal: MzModalComponent, id: Number, day: any, month: any, year: any) {
    /*let params = {
      "player": id,
      "date": day + '/' + month + '/' + year
    }*/
    let self = this;
    this.loadingService.showPreloader();
    let date = new Date(year, month - 1, day);
    this.dailyActivity.dayText = this.datePipe.transform(date, 'EEEE');

    Promise.all([
      new Promise(function (resolve, reject) {
        let params = {};

        self.taskService.findTasks(params).subscribe(
          (response) => {
            self.dailyActivity.playerId = response.player.id;
            self.dailyActivity.playerName = response.player.name;
            self.dailyActivity.day = day;
            self.dailyActivity.month = month;
            self.dailyActivity.year = year;
            self.dailyActivity.progress = response.progress;
            self.dailyActivity.activities = response.activities;
            resolve();
          }
        )
      }),
      new Promise(function (resolve, reject) {
        let allocationParams = {}
        self.playerService.findAllocation(allocationParams).subscribe(
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

  designate() {
    if (!this.isDesigning) {
      this.isDesigning = true;
      let params = {};

      this.playerService.findDesignatePlayers(params).subscribe(
        (response) => {
          this.dailyActivity.playersRatedFiltered = response.rated;
          this.dailyActivity.playersAvailableFiltered = response.available;
          this.dailyActivity.playersRated = response.rated;
          this.dailyActivity.playersAvailable = response.available;
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

    debugger;
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
    this.player = this.dailyActivity.playersAvailable.filter(
      (curr) => {
        return curr.id == this.designatePlayer.id;
      }
    )[0];

    if (this.player.activities != null) {
      this.busy = true;
    } else {
      this.busy = false;
    }

    modal.openModal();

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
