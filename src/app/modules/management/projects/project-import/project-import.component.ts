import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/core/services/project.service';
import { ConfirmComponent } from 'src/app/shared/components/modal/confirm/confirm.component';
import { MatDialog, PageEvent } from '@angular/material';
import { ProjectEditComponent } from '../project-edit/project-edit.component';

@Component({
  selector: 'app-project-import',
  templateUrl: './project-import.component.html',
  styleUrls: ['./project-import.component.css']
})
export class ProjectImportComponent implements OnInit {

  projects: any;
  projectDetails: any;
  projectName: string;
  loader: boolean = false;
  statusProjectText: String;
  
  page: number = 1
  totalFound: number;

  // --------------- Paginação --------------- //
  length: number;
  pageSize: number = 20;
  // pageSizeOptions: number[] = [20, 30, 50, 100];
  // pageEvent: PageEvent;

  constructor(
    private projectService: ProjectService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.getProjects({ page: this.page, pageSize: this.pageSize });
  }

  pageEvent(eventoPaginator) {
    console.log('Entrou dentro do pageEvent');
    console.log(eventoPaginator);
    this.length = eventoPaginator.length;
    this.pageSize = eventoPaginator.pageSize;
    this.page = eventoPaginator.pageIndex + 1;
    console.log(this.page);
    this.getProjects({ page: this.page, pageSize: this.pageSize });
  }

  getProjects(data) {
    this.projects = [];
    this.loader = true;
    this.projectService.getAllProjectsKyrograma(data).subscribe(
      (response) => {
        if(response.totalFound > 0) {
          this.projects = response.list;

          // Dados de retorno da paginação
          this.pageSize = response.pageSize;
          this.page = response.page;
          this.length = response.totalFound;

          this.loader = false;
          return;
        }
        this.loader = false;
        console.log(response);
      }, (err) => {
        this.loader = false;
        console.log(err);
      }
    )
  }

  openConfirm(project) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '50vw'
    });
    dialogRef.afterClosed().subscribe(
      (result) => {
        if(result.confirm == true) {
          this.importProjectWorkplayer(project);
        }
    });
  }

  importProjectWorkplayer(project) {
    this.loader = true;
    this.projectService.importProjectWorkplayer(project).subscribe(
      (response) => {
        console.log(response);
        if(response.status == 0) {
          this.projectEditAndSave(project);
          this.loader = false;
          return;
        }
        this.loader = false;
      }, (err) => {
        this.loader = false;
        console.log('Deu ruim');
    })
  }

  projectEditAndSave(project) {
    const dataSend = {
      project: project
    }
    const dialogRef = this.dialog.open(ProjectEditComponent, {
      width: '600px',
      data: dataSend
    });
    dialogRef.afterClosed().subscribe(
      (result) => {
        if(result.confirm == true) {
          this.getProjects({ page: this.page, pageSize: this.pageSize });
        }
    });
  }

  getColor(project) {
    if(!project.valid) {
      this.statusProjectText = 'INVALID_PROJECT'
      return '#ff8a80';
    }
    if(project.workplayerProjectId) {
      this.statusProjectText = 'PROJECT_IN_WORKPLAYER'
      return '#26c6da';
    }
    switch (project.status) {
      case 'BUILDING':
        this.statusProjectText = 'BUILDING';
        return '#494947';
      case 'WAITING':
        this.statusProjectText = 'WAITING';
        return '#FFC53E';
      case 'EXECUTION':
        this.statusProjectText = 'EXECUTION';
        return '#0085B2';
      case 'FINISHED':
        this.statusProjectText = 'FINISHED';
        return '#00D69D';
      case 'HANGING':
        this.statusProjectText = 'HANGING';
        return '#C9133E';
      case 'WAITING EXECUTION':
        this.statusProjectText = 'WAITING EXECUTION';
        return '#949396';
      case 'DELAYED':
        this.statusProjectText = 'DELAYED';
        return '#A50104';
      default:
        this.statusProjectText = project.status;
        return '#000';
    }
  }

  // setPageSizeOptions(setPageSizeOptionsInput: string) {
  //   if (setPageSizeOptionsInput) {
  //     this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  //   }
  // }

  getProjectsName() {
    if(this.projectName) {
      this.getProjects({ page: this.page, pageSize: 20, name: this.projectName });
      return;
    }
    alert('Digite algo')
  }

}
