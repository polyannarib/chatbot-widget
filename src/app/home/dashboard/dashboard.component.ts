import { Component, OnInit, ElementRef, ViewEncapsulation } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { ProjectService } from 'src/app/home/shared/services/project.service';
import { PlayerService } from 'src/app/home/shared/services/player.service';
import { TaskService } from 'src/app/home/shared/services/task.service';
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
  projects: Array<any>;
  playerAllocation: AllocationModel = new AllocationModel();
  daysOfWeek14: Array<String> = [];
  daysOfWeek7: Array<String> = [];
  activityDetail: MzModalComponent;
  dailyActivity: ActivityModel = new ActivityModel();
  projectModel: ProjectModel = new ProjectModel();
  confirmModel: ConfirmModel = new ConfirmModel();
  isDesigning: Boolean = false;
  isReallocating: Boolean = false;
  selectedAvailablePlayer: String;
  today: Date = new Date();

  private graphics: Array<any> = [];
  private chartColors: Array<any> = [];
  private chartOptions: ChartOptions;

  public modalOptions: Materialize.ModalOptions = {
    dismissible: true,
    opacity: .5,
    inDuration: 300,
    outDuration: 200,
    startingTop: '100%',
    endingTop: '10%'
  };

  dateClass = (d: Date) => {
    const date = d.getDate();
    const dateText = this.datePipe.transform(d, 'dd/MM/yyyy');
    return this.playerAllocation.full.includes(dateText)
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
    private datePipe: DatePipe) {
  }

  ngOnInit() {
    this.loadCalendar();
    this.startDate = new Date();
    this.endDate = new Date();
    this.startDate.setDate(this.startDate.getDate() - 2);
    this.endDate.setDate(this.startDate.getDate() + 14);

    let params = {

    }

    this.playerService.findPlayers(params).subscribe(
      (response) => {
        this.players = response;
      }
    );

    this.projectService.listProjects().subscribe(
      (response) => {
        this.projects = response;
      }
    );
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
    let date = new Date(year, month - 1, day);
    this.projectModel.dayText = this.datePipe.transform(date, 'EEEE');

    let params = {};

    this.taskService.findProjectTasks(params).subscribe(
      (response) => {
        this.projectModel.projectName = response.name;
        this.projectModel.day = day;
        this.projectModel.month = month;
        this.projectModel.progress = response.progress;
        this.projectModel.activities = response.activities;
      }
    );

    modal.openModal();

  }

  openModalPlayer(modal: MzModalComponent, id: Number, day: any, month: any, year: any) {
    /*let params = {
      "player": id,
      "date": day + '/' + month + '/' + year
    }*/
    let date = new Date(year, month - 1, day);
    this.dailyActivity.dayText = this.datePipe.transform(date, 'EEEE');
    let params = {};

    this.taskService.findTasks(params).subscribe(
      (response) => {
        this.dailyActivity.playerId = response.player.id;
        this.dailyActivity.playerName = response.player.name;
        this.dailyActivity.day = day;
        this.dailyActivity.month = month;
        this.dailyActivity.year = year;
        this.dailyActivity.progress = response.progress;
        this.dailyActivity.activities = response.activities;
      }
    )

    let allocationParams = {}

    this.playerService.findAllocation(allocationParams).subscribe(
      (response) => {
        this.playerAllocation = response;
      }
    )

    modal.openModal();

  }

  designate() {
    this.isDesigning = true;
    this.isReallocating = false;

    let params = {};

    this.playerService.findDesignatePlayers(params).subscribe(
      (response) => {
        this.dailyActivity.players = response;
      }
    )

  }

  relocateTaskResource(
    modal: MzModalComponent, event: MatDatepickerInputEvent<Date>, 
    playerId: Number, taskId: Number, taskName: String ) {
      this.confirmModel.activityName = taskName;
      this.confirmModel.dateFrom = this.dailyActivity.day + '/' + this.dailyActivity.month + '/' + this.dailyActivity.year;
      this.confirmModel.dateTo = this.datePipe.transform(event.value, 'dd/MM/yyyy');
      this.confirmModel.taskId = taskId;
      this.confirmModel.playerId = playerId;
      let date1 = new Date(this.dailyActivity.year, this.dailyActivity.month - 1, this.dailyActivity.day);
      var date2 = event.value;    
      this.confirmModel.delay = ( date2.getTime() - date1.getTime() ) / (1000 * 3600 * 24); 

      modal.openModal();  
  }

  confirmRelocateTaskResource() {

  }

}
