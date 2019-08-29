import { Component, OnInit, ElementRef, Type } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { ProjectService } from 'src/app/services/project.service';
import { PlayerService } from 'src/app/services/player.service';
import { TaskService } from 'src/app/services/task.service';
import { DatePipe } from '@angular/common';
import { MzModalComponent } from 'ngx-materialize';
import { ActivityModel } from '../../model/ActivityModel';

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
  daysOfWeek: Array<String> = [];
  activityDetail: MzModalComponent;
  dailyActivity: ActivityModel = new ActivityModel();

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

  constructor( 
    private el: ElementRef, 
    private projectService: ProjectService,
    private playerService: PlayerService,
    private taskService: TaskService,
    private datePipe: DatePipe ) {
    }

  ngOnInit() {
    this.loadCalendar();
    this.startDate = new Date();
    this.endDate = new Date();
    this.endDate.setDate( this.startDate.getDate() + 14 );

    let params = {

    }

    this.playerService.findPlayers(params).subscribe(
      (response) => {
        this.players = response;
      }
    );

    //this.projectService.listProjects().subscribe();
    jQuery(this.el.nativeElement).find('.collapsible').collapsible();
    var main = getComputedStyle(document.body).getPropertyValue('--graph-main-color');
    var second = getComputedStyle(document.body).getPropertyValue('--graph-color');
    this.chartColors.push({
      backgroundColor: [main,second],
      pointBackgroundColor: [main,second]
    })
    this.chartOptions = {
      responsive: true,
    };
    
    // Para teste
    this.graphics.push({
      title: "Projeto no prazo",
      data: [5,2],
      labels: ['Projeto no prazo', 'Projeto atrasado'],
      type: 'pie'
    })
    this.graphics.push({
      title: "Recurso utilizado",
      data: [5,20],
      labels: ['Recurso utilizado', 'Recurso não utilizado'],
      type: 'pie'
    })
    this.graphics.push({
      title: "Cards Utilizados",
      data: [15,2],
      labels: ['JS', 'Java'],
      type: 'pie'
    })
    this.graphics.push({
      title: "Projeto alterado",
      data: [15,5],
      labels: ['Projetos alterados', 'Projeto não alterados'],
      type: 'pie'
    })
    this.graphics.push({
      title: "Recurso disponível",
      data: [15,2],
      labels: ['Recurso disponível', 'Recurso não disponível'],
      type: 'pie'
    })
    this.graphics.push({
      title: "Projetos no prazo",
      data: [15,2],
      labels: ['Projetos no prazo', 'Projetos atrasados'],
      type: 'pie'
    })
  }

  loadCalendar() {
    let today = new Date();
    for( let i = 0 ; i < 14 ; i++ ) {
      this.daysOfWeek.push( this.datePipe.transform(today, 'E') );
      today.setDate( today.getDate() + 1 );
    }
  }

  openModal(modal: MzModalComponent, id: Number, day: any, month: any, year: any) {
    /*let params = {
      "player": id,
      "date": day + '/' + month + '/' + year
    }*/
    let date = new Date( year, month - 1, day );
    this.dailyActivity.dayText = this.datePipe.transform( date, 'EEEE' );
    let params = {};

    this.taskService.findTasks(params).subscribe(
      (response) => {
        this.dailyActivity.playerName = response.player.name;
        this.dailyActivity.day = day;
        this.dailyActivity.month = month;
        this.dailyActivity.progress = response.progress;
        this.dailyActivity.activities = response.activities;
      }
    )

    modal.openModal();

  }
}
