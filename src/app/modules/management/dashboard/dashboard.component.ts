import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {ProjectCreateComponent} from "../projects/project-create/project-create.component";
import { MatDialog } from '@angular/material';
import {ProfileService} from "../../../core/services/profile.service";
import {ProjectsListComponent} from "../projects/projects-list/projects-list.component";
import { AuthService } from 'src/app/core/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from 'src/app/core/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  mainStyle = this.profileService.getAppMainColor();
  form: FormGroup = this.formBuilder.group({
    selectedDash: [null, [Validators.required]],
  });
  dashboardList: any;
  dashboard: any;

  constructor(
    private formBuilder: FormBuilder,
    private dashboardService: DashboardService,
    private profileService: ProfileService
  ) { }

  ngOnInit() {
    this.getDash();
  }

  getDash() {
    this.dashboardService.getDashboards().subscribe(
      (response) => {
        if(response.status == 0) {
          this.dashboardList = response.object
          return;
        }
      }
    )
  }

  ngSubmit() {
    if(this.form.valid) {
      this.dashboard = this.form.value;
    }
  }

}
