import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { ProjectService } from 'src/app/core/services/project.service';
import { ProfileService } from 'src/app/core/services/profile.service';
import {AuthService} from '../../../../core/services/auth.service';
import {NotifyComponent} from "../../../../shared/components/notify/notify.component";

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css']
})
export class ProjectCreateComponent implements OnInit {

  workgroups: Workgroup[] = [{value: -1, viewValue: 'Escolher'}];
  managers: Manager[] = [{value: -1, viewValue: 'Escolher'}];
  formCreateProject: FormGroup = this.formBuilder.group({
    name: [null, [Validators.required]],
    projectManager: [null, [Validators.required]],
    customerOwner: [null, [Validators.required]],
    description: [null, [Validators.required]],
    identify: [null, [Validators.required]],
    workgroup: [null, [Validators.required]]
  });
  loader = false;
  mainStyle = this.profileService.getAppMainColor();
  scopes: any;
  profile: any;

  constructor(
    public dialogRef: MatDialogRef<ProjectCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private _snackBar: MatSnackBar,
    private profileService: ProfileService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.scopes = Object.assign({}, this.authService.getScopes());
    this.findFromProfile();
  }

  findFromProfile() {
    this.loader = true;
    this.profileService.getProfile().subscribe(
      (response) => {
        if (response.status === 0) {
          this.loader = false;
          if (response.object != null) {
            this.profile = response.object.person;
            console.log(this.profile);
            if (this.profile.workgroupList != null) {
              this.profile.workgroupList.map(workgroup => {
                this.workgroups.push({value: workgroup.id, viewValue: workgroup.name});
              });
              if (this.scopes.wpleader) {
                this.findAllMasters();
              } else if (this.scopes.wpmaster) {
                this.workgroups.map(workgroup => this.findManagersFromWorkgroup(workgroup.value));
              }
            }
          }
          return;
        }
        this.httpError(response.message);
        this.loader = false;
      }, (err) => {
        this.httpError(null);
        this.loader = false;
      }
    );
  }

  findAllMasters() {
    this.loader = true;
    this.projectService.getAllMasters().subscribe(
      (response) => {
        if (response.status === 0) {
          this.loader = false;
          if (response.object != null) {
            const objects = response.object;
            objects.map(object => {
              this.managers.push({value: object.personId, viewValue: object.name});
              if (object.workgroupList != null) {
                object.workgroupList.map(workgroup => this.workgroups.push({value: workgroup.id, viewValue: workgroup.name}));
              }
            });
          }
          return;
        }
        this.httpError(response.message);
        this.loader = false;
      }, (err) => {
        this.httpError(null);
        this.loader = false;
      }
    );
  }

  findManagersFromWorkgroup(id) {
    this.loader = true;
    if (id !== -1) {
      this.projectService.getAllMastersByWorkgroup(id).subscribe(
        (response) => {
          if (response.status === 0) {
            this.loader = false;
            if (response.object != null) {
              const objects = response.object;
              objects.map(object => {
                this.managers.push({value: object.personId, viewValue: object.name});
                if (object.workgroupList != null) {
                  object.workgroupList.map(workgroup => this.workgroups.push({value: workgroup.id, viewValue: workgroup.name}));
                }
              });
            }
            return;
          }
          this.httpError(response.message);
          this.loader = false;
        }, (err) => {
          this.httpError(null);
          this.loader = false;
        }
      );
    }
  }

  createProject() {
    const projectName = this.formCreateProject.controls.name.value;
    const workgroup = this.formCreateProject.controls.workgroup.value;
    const description = this.formCreateProject.controls.description.value;
    const identify = this.formCreateProject.controls.identify.value;
    const manager = this.formCreateProject.controls.projectManager.value;

    const data = {
      name: projectName,
      description,
      identify,
      projectManager: {
        personId: manager
      },
      team: {
        id: workgroup
      }
    };
    this.loader = true;
    this.projectService.createProject(data).subscribe(
      (response) => {
        if (response.status === 0) {
          this.loader = false;
          console.log(response);
          this.dialogRef.close({confirm: true});
          return;
        }
        this.httpError(response.message);
        this.loader = false;
      }, (err) => {
        this.httpError(null);
        this.loader = false;
      }
    );
  }

  httpError(value) {
    switch (value) {
      case 'FAIL_TO_LIST_TASK':
        this._snackBar.openFromComponent(NotifyComponent,
          { data: { type: 'error', message: 'Problemas, contate o administrador' }});
        break;
      default:
        this._snackBar.openFromComponent(NotifyComponent,
          { data: { type: 'error', message: 'Problemas, contate o administrador' }});
        break;
    }
  }
}

interface Workgroup {
  value: number;
  viewValue: string;
}

interface Manager {
  value: number;
  viewValue: string;
}
