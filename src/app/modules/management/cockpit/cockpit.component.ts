import { Component, OnInit } from '@angular/core';
import { ProjectCreateComponent } from '../projects/project-create/project-create.component';
import { MatDialog } from '@angular/material';
import { ProfileService } from 'src/app/core/services/profile.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {

  loader: boolean = false;
  loaderDash: any = {
    resource: true,
    project: true,
    graph: true
  };
  mainStyle = this.profileService.getAppMainColor();
  secondarytyle = this.profileService.getAppSecondaryColor();
  scopes: any;

  constructor(
    public dialog: MatDialog,
    private profileService: ProfileService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.scopes = Object.assign({}, this.authService.getScopes());
  }

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
      type: 'create'
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
