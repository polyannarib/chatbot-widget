<<<<<<< HEAD:src/app/home/dashboard/dashboard.component.ts
import { Component, OnInit, ElementRef, Type, ViewChild, ViewEncapsulation } from '@angular/core';
import { ProjectService } from 'src/app/home/shared/services/project.service';
import { PlayerService } from 'src/app/home/shared/services/player.service';
import { TaskService } from 'src/app/home/shared/services/task.service';
import { LoadingService } from 'src/app/home/shared/services/loading.service';
import { ChartService } from 'src/app/home/shared/services/chart.service';
=======
import { Component, OnInit, ElementRef, Type, ViewChild } from '@angular/core';
>>>>>>> architecture:src/app/modules/home/dashboard/dashboard.component.ts
import { DatePipe } from '@angular/common';
import { MzModalComponent } from 'ngx-materialize';
// import { ActivityModel } from '../../../shared/models/ActivityModel';
// import { ProjectModel } from '../../../shared/models/ProjectModel';
// import { AllocationModel } from '../../../shared/models/AllocationModel';
// import { ConfirmModel } from '../../../shared/models/ConfirmModel';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
<<<<<<< HEAD:src/app/home/dashboard/dashboard.component.ts
import { ConfirmModel } from '../shared/model/ConfirmModel';
import { ChartModel } from '../shared/model/ChartModel';
import { MzModalService } from 'ngx-materialize';
import { ModalSuccessComponent } from '../modal/success/modal-success.component';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';

import { FormControl, FormArray, FormGroup, Validators } from '@angular/forms';

import {CoreService} from './services/core.service';
import {MatTableDataSource} from '@angular/material';
import { PeriodicElement } from './models/periodic';

import { BehaviorSubject } from 'rxjs'
import { NoteService } from '../shared/services/note.service';


=======
import { MzModalService } from 'ngx-materialize';
import { ProjectService } from 'src/app/core/services/project.service';
import { PlayerService } from 'src/app/core/services/player.service';
import { TaskService } from 'src/app/core/services/task.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { ModalSuccessComponent } from '../shared/modal/success/modal-success.component';
import { Allocation } from 'src/app/shared/models/allocation';
import { Activity } from 'src/app/shared/models/activity';
import { Project } from 'src/app/shared/models/project';
import { Player } from '@angular/core/src/render3/interfaces/player';
>>>>>>> architecture:src/app/modules/home/dashboard/dashboard.component.ts

declare var jQuery: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  //STATUSREPORT
  displayedColumns: string[] = ['nota', 'dtInicio','dtPrazo', 'dtFim', 'obs', 'status', 'concluida'];
  dataSource = this.core.list$;
  newDatasource = this.core.list;
  controls: FormArray;
  //


  @ViewChild( 'success' )
  successModal: any;

  legends: Array< any > = new Array< any >();
  chartModel: Array< ChartModel > = new Array< ChartModel >();
  blankChartModel: Array< ChartModel > = new Array< ChartModel >();
  selectedTime: String;
  selectedDate: String;
  startDate: Date;
  startDatePlayer: Date;
  endDate: Date;
  endDateProject: Date;
  players: Array<any>;
  filteredPlayers: Array<any>;
  player: Player;
  projects: Array<any>;
  filteredProjects: Array<any>;
  playerAllocation: Allocation;
  projectAllocation: Allocation;
  daysOfWeek14: Array<String> = [];
  daysOfWeek7: Array<String> = [];
  activityDetail: MzModalComponent;
  dailyActivity: Activity;
  projectModel: Project;
  confirmModel: any;
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
  editingHour: any;
  editingDatetime: any;
  projectModal: Boolean;
  reason: String;
  day: any;
  month: any;
  year: any;
  page: number = 1;
  pageSize: number = 6;
  countChart: number = 0;
  statusReportFilter: any;
  projectId: any;

  keyword = 'name';
  data = [{
    'id':1,
    'name':"Concluido dentro do prazo"
  }, 
  {
    'id':2,
    'name':"Concluido com anexo"
  }, 
  {
    'id':3,
    'name':"Em andamento - dentro do prazo"
  }, 
  {
    'id':4,
    'name':"Em andamento - probabilidade de desvio"
  }, 
  {
    'id':5,
    'name':"Em andamento - atrasado"
  }
]

  public modalOptions: Materialize.ModalOptions = {
    dismissible: true,
    opacity: .5,
    inDuration: 300,
    outDuration: 200,
    startingTop: '100%',
    endingTop: '10%',
    complete: () => { 
      // this.clean() 
    }
  };

  dateClassPlayer = (d: Date) => {
    const dateText = this.datePipe.transform(d, 'dd-MM-yyyy');
    return this.playerAllocation.allocated.includes(dateText)
      ? 'full-day' : 'unallocated';
  }

  dateClassProject = (d: Date) => {
    const dateText = this.datePipe.transform(d, 'dd-MM-yyyy');
    return this.projectAllocation.allocated.includes(dateText)
      ? 'full-day' : 'unallocated';
  }

  weekend = (d: Date): boolean => {
    const day = d.getDay();
    return day !== 0 && day !== 6;
  }

  constructor(
    private core: CoreService,
    private projectService: ProjectService,
    private playerService: PlayerService,
    private taskService: TaskService,
    private datePipe: DatePipe,
    private loadingService: LoadingService,
<<<<<<< HEAD:src/app/home/dashboard/dashboard.component.ts
    private modalService: MzModalService,
    private chartService: ChartService ,
    private noteService: NoteService) {
  }
=======
    private modalService: MzModalService 
  ) { }
>>>>>>> architecture:src/app/modules/home/dashboard/dashboard.component.ts

  ngOnInit() {

    //STATUSREPORT
   
    var toGroups = this.core.list$.value.map(entity => {
      return new FormGroup({
        nota: new FormControl(entity.nota, Validators.required), 
        dtInicio: new FormControl(entity.dtInicio, Validators.required),
        dtPrazo: new FormControl(entity.dtPrazo, Validators.required),
        dtFim: new FormControl(entity.dtFim, Validators.required),
        obs: new FormControl(entity.obs, Validators.required),
        status: new FormControl(entity.status, Validators.required),
        concluida: new FormControl(entity.concluida, Validators.required)
      },{updateOn: "blur"});
    });
    this.refreshTable();
    //

    this.controls = new FormArray(toGroups);
    
    let self = this;
    this.loadingService.showPreloader();
    this.loadCalendar();
    this.startDate = new Date();
    this.endDate = new Date();
    this.endDateProject = new Date();
    this.startDate.setDate(this.startDate.getDate() - 2);
    this.endDate.setDate(this.startDate.getDate() + 13);
    this.endDateProject.setDate(this.startDate.getDate() + 9);
    this.startDatePlayer = this.startDate;
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
            self.filteredPlayers = response.object.list;
            resolve();
          }
        );
      }),
      new Promise(function(resolve, reject) {
        self.findCharts();
        resolve();
      }),
      new Promise(function (resolve, reject) {
        let params = {
          "startDate": self.datePipe.transform(self.startDate, 'dd-MM-yyyy'),
          "endDate": self.datePipe.transform(self.endDateProject, 'dd-MM-yyyy')
        }
        self.projectService.listProjects(params).subscribe(
          (response) => {
            self.projects = response.object.list;
            self.filteredProjects = response.object.list;
            resolve();
          }
        );
      })
    ]).then(() => {
      self.loadingService.hidePreloader();
    });
  }

  checkDate( date: any ): Date {
    return new Date( date );
  }

  changeProjectWeek( orientation: any ) {
    let today = new Date();
    this.daysOfWeek7 = [];
    this.loadingService.showPreloader();
    if( orientation == 'RIGHT' ) {
      today.setDate(this.endDateProject.getDate());
      this.startDate.setDate(today.getDate());
      for (let i = 0; i < 9; i++) {
          this.daysOfWeek7.push(this.datePipe.transform(today, 'E'));
        today.setDate(today.getDate() + 1);
      }
      this.endDateProject.setDate( today.getDate() );
    } else if( orientation == 'LEFT' ) {
      today.setDate(this.startDate.getDate());
      this.endDateProject.setDate( today.getDate() );
      for (let i = 0; i < 9; i++) {
          this.daysOfWeek7.push(this.datePipe.transform(today, 'E'));
        today.setDate(today.getDate() - 1);
      }
      this.startDate.setDate(today.getDate());
    }
    let params = {
      "startDate": this.datePipe.transform(this.startDate, 'dd-MM-yyyy'),
      "endDate": this.datePipe.transform(this.endDateProject, 'dd-MM-yyyy')
    }
    this.projectService.listProjects(params).subscribe(
      (response) => {
        this.projects = response.object.list;
        this.filteredProjects = response.object.list;
        this.loadingService.hidePreloader();
      }
    );
  }

  loadCalendar() {
    let today = new Date();
    today.setDate(today.getDate() - 2);
    for (let i = 0; i < 13; i++) {
      this.daysOfWeek14.push(this.datePipe.transform(today, 'E'));
      if (i < 9) {
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
    this.day = day;
    this.month = month;
    this.year = year;
    Promise.all([
      new Promise(function (resolve, reject) {

        self.taskService.findProjectTasks(id, day + '-' + month + '-' + year).subscribe(
          (response) => {
            const obj = response.object;
            self.projectModel.projectName = obj.name;
            self.projectModel.date = self.editingDate;
            self.projectModel.dateFmt = day+'/'+month+'/'+year;
            self.dailyActivity.day = day;
            self.dailyActivity.month = month;
            self.dailyActivity.year = year;
            self.projectModel.progress = obj.progress;
            self.projectModel.activities = obj.tasks;
            resolve();
          }
        );
      })
    ]).then(() => {
      modal.openModal();
      self.loadingService.hidePreloader();
    })
  }

  openModalStatusReport(modal: MzModalComponent, id: Number) {
    let self = this;
    this.projectModal = true;
    this.projectId = id;
    console.log(id);
    console.log("teste");
    modal.openModal();
    this.core.list = [];
    this.core.list2 = [];
    this.noteService.findNotes({"page":1,"pageSize":50,"projectId":id }).subscribe((resp) =>
    {
      resp.object.list.forEach(element => {
        
          this.core.list.push(
              {noteId: element.noteId, nota: element.noteDescription, dtInicio: new Date(element.noteDate).toLocaleDateString(), dtPrazo: new Date(element.noteDate).toLocaleDateString(), dtFim: '', obs: element.observation, status: element.status.id, concluida: 'false'},  
          )
          this.core.list2.push(
            {noteId: element.noteId, nota: element.noteDescription, dtInicio: new Date(element.noteDate).toLocaleDateString(), dtPrazo: new Date(element.noteDate).toLocaleDateString(), dtFim: '', obs: element.observation, status: element.status.id, concluida: 'false'},  
        )
        
      });
      this.refreshTable(); 
    });

   
  }

  openModalPlayer(modal: MzModalComponent, id: Number, day: any, month: any, year: any) {
    let self = this;
    this.loadingService.showPreloader();
    this.projectModal = false;
    this.editingPlayer = id;
    this.editingDate = day+'-'+month+'-'+year;
    let date = new Date(year, month - 1, day);
    this.dailyActivity.dayText = this.datePipe.transform(date, 'EEEE');
    this.day = day;
    this.month = month;
    this.year = year;
    Promise.all([
      new Promise(function (resolve, reject) {

        self.taskService.findTasks(id, day+'-'+month+'-'+year).subscribe(
          (response) => {
            const obj = response.object;
            self.dailyActivity.playerId = obj.player.id;
            self.dailyActivity.playerName = obj.player.name;
            self.dailyActivity.date = self.editingDate;
            self.dailyActivity.day = day;
            self.dailyActivity.month = month;
            self.dailyActivity.year = year;
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
            self.playerAllocation = response.object;
            console.log(self.playerAllocation);
            resolve();
          }
        )
      })
    ]).then(() => {
      self.loadingService.hidePreloader();
      modal.openModal();
    });
  }

  findProjectAllocation( player: any, picker: any ) {
    this.loadingService.showPreloader();
    if( player == null ) {
      this.projectAllocation.full = [];
      this.projectAllocation.allocated = [];
      this.projectAllocation.unallocated = [];
      picker.open();
      this.loadingService.hidePreloader();
    } else {
      let allocationParams = {
        "startDate": '23-09-2019',
        "endDate": '23-12-2019'
      }
      this.playerService.findAllocation(player.id, allocationParams).subscribe(
        (response) => {
          this.projectAllocation = response.object;
          picker.open();
          this.loadingService.hidePreloader();
        }
      )
    }
  }

  // designate(taskId) {
  //   if (!this.isDesigning) {
  //     this.isDesigning = true;

  //     this.loadingService.showPreloader();

  //     this.playerService.findDesignatePlayers(taskId).subscribe(
  //       (response) => {
  //         const obj = response.object;
  //         this.dailyActivity.playersRatedFiltered = obj.rated;
  //         this.dailyActivity.playersAvailableFiltered = obj.available;
  //         this.dailyActivity.playersRated = obj.rated;
  //         this.dailyActivity.playersAvailable = obj.available;
  //         this.loadingService.hidePreloader();
  //       }
  //     )
  //   } else {
  //     this.isDesigning = false;
  //   }
  // }

  relocateTaskResource(
    modal: MzModalComponent, event: MatDatepickerInputEvent<Date>,
    playerId: Number, taskId: Number, taskName: String, previewedAt: any) {
      this.confirmModel.activityName = taskName;
      this.confirmModel.dateFrom = this.dailyActivity.day + '/' + this.dailyActivity.month + '/' + this.dailyActivity.year;
      this.confirmModel.dateTo = this.datePipe.transform(event.value, 'dd/MM/yyyy');
      this.editingDate = this.datePipe.transform(event.value, 'dd-MM-yyyy');
      this.selectedTime = this.datePipe.transform(previewedAt, 'HH:mm:ss');
      this.selectedDate = this.datePipe.transform(event.value, 'dd/MM/yyyy');
      this.editingDatetime = this.editingDate + ' ' + this.selectedTime;
      this.editingTask = taskId;
      this.confirmModel.taskId = taskId;
      this.confirmModel.playerId = playerId;
      let date1 = new Date(this.dailyActivity.year, this.dailyActivity.month - 1, this.dailyActivity.day);
      var date2 = event.value;
      this.confirmModel.delay = Math.trunc( (date2.getTime() - date1.getTime()) / (1000 * 3600 * 24) );
      modal.openModal();
    }

  confirmRelocateTaskResource() {
    this.taskService.rescheduleTask(this.editingTask, this.editingDate + ' ' + this.selectedTime).subscribe(
      (response) => {
        this.refreshModalData();
        this.refreshTableData();
        this.modalService.open( ModalSuccessComponent );
      }
    )
  }

  onSearchChangeProject(searchValue: string): void {
    this.filteredProjects = this.projects.filter(
      (curr) => {
        return curr.name.toUpperCase().includes(searchValue.toUpperCase());
      }
    )
  }

  onSearchChangeResource(searchValue: string): void {
    this.filteredPlayers = this.players.filter(
      (curr) => {
        return curr.name.toUpperCase().includes(searchValue.toUpperCase());
      }
    )
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
        this.taskService.findProjectTasks(this.editingProject, this.editingDate).subscribe(
          (response) => {
            const obj = response.object;
            this.refreshTableData();
            this.projectModel.projectName = obj.name;
            this.projectModel.date = this.editingDate;
            this.projectModel.progress = obj.progress;
            this.projectModel.activities = obj.tasks;
            this.isDesigning = false;
            this.modalService.open( ModalSuccessComponent );
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
        this.refreshModalData();
        this.refreshTableData();
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
          this.refreshModalData();
          this.refreshTableData();
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
        this.refreshModalData();
        this.modalService.open( ModalSuccessComponent );
      }
    )
  }

  refreshTableData() {
    let self = this;

    self.loadingService.showPreloader();

    Promise.all([
      new Promise(function (resolve, reject) {
        let params = {
          "startDate": self.datePipe.transform(self.startDatePlayer, 'dd-MM-yyyy'),
          "page": 1,
          "pageSize": 10
        }
        self.playerService.findPlayers(params).subscribe(
          (response) => {
            self.players = response.object.list;
            self.filteredPlayers = response.object.list;
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
            self.filteredProjects = response.object.list;
            self.projects = response.object.list;
            resolve();
          }
        );
      })
    ]).then(() => {
      self.loadingService.hidePreloader();
    });

  }

  refreshModalData() {
    if( this.projectModal ) {
      this.taskService.findProjectTasks(this.editingProject, this.editingDate).subscribe(
        (response) => {
          const obj = response.object;
          console.log(obj);
          this.projectModel.projectName = obj.name;
          this.projectModel.date = this.editingDate;
          this.projectModel.dateFmt = this.day+'/'+this.month+'/'+this.year;
          this.dailyActivity.day = this.day;
          this.dailyActivity.month = this.month;
          this.dailyActivity.year = this.year;
          this.projectModel.progress = obj.progress;
          this.projectModel.activities = obj.tasks;
        }
      );
    } else {
      this.taskService.findTasks(this.editingPlayer, this.editingDate).subscribe(
        (response) => {
          const obj = response.object;
          console.log(obj);
          this.dailyActivity.playerId = obj.player.id;
          this.dailyActivity.playerName = obj.player.name;
          this.dailyActivity.date = this.editingDate;
          this.dailyActivity.day = this.day;
          this.dailyActivity.month = this.month;
          this.dailyActivity.year = this.year;
          this.dailyActivity.dateFmt = this.day+'/'+this.month+'/'+this.year;
          this.dailyActivity.progress = obj.progress;
          this.dailyActivity.activities = obj.tasks;
        }
      )
    }
  }

  cleanDesignate() {
    console.log(this.isDesigning);
    this.isDesigning = false;
  }

  // clean() {
  //   this.confirmDesignate = false;
  //   this.playerAllocation = new AllocationModel();
  //   this.projectAllocation = new AllocationModel();
  //   this.dailyActivity = new ActivityModel();
  //   this.projectModel = new ProjectModel();
  //   this.confirmModel = new ConfirmModel();
  //   this.isDesigning = false;
  // }

  openReport() {
      window.open("http://192.168.0.216:9300/bi/?pathRef=.public_folders%2FGamifica%25C3%25A7%25C3%25A3o%2FStatus%2BReport", "_blank");
  }

  openModalSatusReport(modal: MzModalComponent) {
    let self = this;
    this.loadingService.showPreloader();
    this.projectModal = false;
    
    Promise.all([
      new Promise(function (resolve, reject) {
        var teste = '1';
      })
    ]).then(() => {
      modal.openModal();
      self.loadingService.hidePreloader();
    })
  }

  public loadScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = true;
    script.type = 'module';
    body.appendChild(script);
  }

  updateField(index, field) {
    const control = this.getControl(index, field);
    if (control.valid) {
      let value = control.value.toLocaleDateString();
      console.log(value);
      this.core.update(index,field,value);
    }
   }

  checkConclusao(index){
    const control = this.getControl(index, 'concluida');
    if(control.value == 'false'){
      return false
    }
    else
      return true
  }

  updateCheckField(index) {
    var field = 'concluida'
    const control = this.getControl(index, field);
    if (control.valid) {
      if(control.value != 'false'){
        this.core.update(index, field, 'false');
        this.core.update(index, 'dtFim', '');
        this.refreshTable();
      }
      else{
        var date = new Date().toLocaleDateString();
        this.core.update(index, field, date);
        this.core.update(index, 'dtFim', date);
        this.refreshTable();
      }
    }
   }

  getControl(index, fieldName) {
    const a  = this.controls.at(index).get(fieldName) as FormControl;
    return this.controls.at(index).get(fieldName) as FormControl;
  }

  addRow() {
    var newRow = {noteId: undefined, nota: 'Adicionar nota', dtInicio: new Date('09-11-2019').toLocaleDateString(), dtPrazo: new Date('09-11-2019').toLocaleDateString(), dtFim: '', obs: 'Observação', status: 3, concluida: 'false'};
    this.core.list.push(newRow);
    this.core.list2.push(newRow);

    this.refreshTable()
  }

  changeReport(){
    console.log(this.statusReportFilter);



  }


  refreshTable(){
    var newlist$: BehaviorSubject<PeriodicElement[]> = new BehaviorSubject(this.core.list);
    this.core.list$ = newlist$;
    this.dataSource = this.core.list$;
    
    var toGroups = this.core.list$.value.map(entity => {
      return new FormGroup({
        nota: new FormControl(entity.nota, Validators.required), 
        dtInicio: new FormControl(entity.dtInicio, Validators.required),
        dtPrazo: new FormControl(entity.dtPrazo, Validators.required),
        dtFim: new FormControl(entity.dtFim, Validators.required),
        obs: new FormControl(entity.obs, Validators.required),
        status: new FormControl(entity.status, Validators.required),
        concluida: new FormControl(entity.concluida, Validators.required)
      },{updateOn: "blur"});
    });

    this.controls = new FormArray(toGroups);
  }

  getStatus(index){
    const control = this.getControl(index, 'status');
    return control.value;
  }
  selectEvent(item) {
    this.core.refreshListFilter(item.id);
    this.refreshTable();
    // do something with selected item
  }

  onChangeSearch(val: string) {
    console.log(val);
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }
  
  onFocused(e){
    console.log(e);
    this.core.refreshListFilter(null);
    this.refreshTable();
    // do something when input is focused
  }


  saveNotes(){
    let lista = [];
    this.core.list2.forEach((element)=>{
      lista.push(
        { 
          'noteId': element.noteId,
          'noteDescription':element.nota,
          'noteDate':new Date().getTime(),
          'status':{
            'id':element.status
          },
          'type':{
            'id':1
          },
          'project':{ 
            'id':this.projectId
          },
          'noteNum':1,          
          'observation':element.obs
        }

      );
      this.noteService.saveNotes(lista).subscribe((res) => {
        console.log(res);
      });

    })


  }
findCharts() {
    this.loadingService.showPreloader();
    let params = {
      "page": this.page,
      "pageSize": this.pageSize
    }
    this.chartService.findCharts(params).subscribe(
      (response) => {
         this.countChart = response.object.count;
         response.object.charts.forEach( (curr: any) => {
          let tmp = new ChartModel();
          tmp.pieChartColors = [{
            "backgroundColor": curr.backgroundColor,
            "hoverBackgroundColor": curr.hoverBackgroundColor,
            "borderWidth": 2,
          }];
          tmp.pieChartLabels = curr.labels;
          tmp.pieChartData = curr.data;
          tmp.pieChartOptions = {
            responsive: true,
            scales: {
              position: 'top'
            },
            title: {
              display: true,
              text: curr.label,
              position: 'top'
            },
            spanGaps: false,
            maintainAspectRatio: true,
            tooltips: {
              enabled: true
            },
            legend: {
              position: 'top',
              align: 'start',
              display: true,
              labels: {
                boxWidth: 50
              }
            },
            plugins: {
              datalabels: {
                formatter: (value, ctx) => {
                  const label = ctx.chart.data.labels[ctx.dataIndex];
                  return label;
                },
              },
            }
          };
          this.chartModel.push( tmp );
         });
         this.loadingService.hidePreloader();
      }
    )
  }

  refreshChart() {
    this.chartModel = new Array< ChartModel >();
    this.findCharts();
  }

  chartToLeft() {
    this.chartModel = new Array< ChartModel >();
    this.page = this.page - 1;
    this.findCharts();
  }

  chartToRight() {
    this.chartModel = new Array< ChartModel >();
    this.page = this.page + 1;
    this.findCharts();
  }

  /* CHARTS */
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [];
  public pieChartColors = [{"backgroundColor": [],"hoverBackgroundColor":[],"borderWidth":2}];

}

/* export interface Element {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: Element[] = [
  {nota: 'teste', dtInicio: new Date('09-11-2015').toLocaleDateString(), dtPrazo: new Date('09-11-2025').toLocaleDateString(), dtFim: '', obs: 'obs', status: 2, concluida: 'false'}
]; */
