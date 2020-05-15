import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {ProjectCreateComponent} from "../projects/project-create/project-create.component";
import { MatDialog } from '@angular/material';
import {ProfileService} from "../../../core/services/profile.service";
import {ProjectsListComponent} from "../projects/projects-list/projects-list.component";
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  loader: boolean = false;
  loaderDash: any = {
    resource: true,
    project: true,
    graph: true
  };
  mainStyle = this.profileService.getAppMainColor();
  secondarytyle = this.profileService.getAppSecondaryColor();
  scopes = Object.assign({}, this.authService.getScopes());

  constructor(
    public dialog: MatDialog, 
    private profileService: ProfileService,
    private authService: AuthService  
  ) { }

  ngOnInit() { }

  loaderResource(estado) {
    // console.log('entrou dentro do loaderResource'+ estado);
    // if(estado == true) {
    //   this.loaderResourceStatus = true;
    // }
    // this.loaderResourceStatus = false;
    this.loaderDash.resource = estado
    this.loaderPage();
  }

  loaderProject(estado) {
    // console.log('entrou dentro do loaderProject'+ estado);
    // if(estado == true) {
    //   this.loaderProjectStatus = true;
    // }
    // this.loaderProjectStatus = false;
    this.loaderDash.project = estado;
    this.loaderPage();
  }

  loaderGraph(estado) {
    // console.log('entrou dentro do loaderGraph'+ estado);
    // if(estado == true) {
    //   this.loaderGraphStatus = true;
    // }
    // this.loaderGraphStatus = false;
    this.loaderDash.graph = estado;
    this.loaderPage();
  }

  loaderPage() {
    if(this.loaderDash.resource == true || this.loaderDash.project == true || this.loaderDash.graph == true) {
      this.loader = true;
    }
    this.loader = false;
  }

  modalAddProject() {
    const dataSend = {
      projectId: 0,
      projectDate: 10
    };
    const dialogRef = this.dialog.open(ProjectCreateComponent, {
      width: '90vw',
      data: dataSend
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loader = true;
      window.location.reload();
    });
  }

}
