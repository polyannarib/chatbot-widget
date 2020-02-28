import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/core/services/project.service';
import { ConfirmComponent } from 'src/app/shared/components/modal/confirm/confirm.component';
import { MatDialog } from '@angular/material';
import { ProjectEditComponent } from '../project-edit/project-edit.component';

@Component({
  selector: 'app-project-import',
  templateUrl: './project-import.component.html',
  styleUrls: ['./project-import.component.css']
})
export class ProjectImportComponent implements OnInit {

  projects: any;
  loader: boolean = false;
  projectDetails: any;
  statusProjectText: String;
  
  pageSize: number = 10;
  page: number;
  totalFound: number;

  constructor(
    private projectService: ProjectService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.getProjects();
  }

  getProjects() {
    this.loader = true;
    this.projectService.getAllProjectsKyrograma().subscribe(
      (response) => {
        if(response.totalFound > 0) {
          this.projects = response.list;

          // Dados de retorno da paginação
          this.pageSize = response.pageSize;
          this.page = response.page;
          this.totalFound = response.totalFound;

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
      width: '50vw',
      data: dataSend
    });
    dialogRef.afterClosed().subscribe(
      (result) => {
        if(result.confirm == true) {
          this.getProjects();
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

}
