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
  formCreateProject: FormGroup;
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
    this.loader = true;
    this.projectService.getProjectInfo(this.data.project.id).subscribe(
      (response) => {
        if (response.status === 0) {
          this.loader = false;
          console.log(response);
          this.data.project = response.object[0];
          this.getType();
          return;
        }
        this.httpError(response.message);
        this.loader = false;
        this.dialogRef.close({confirm: true});
      }, (err) => {
        this.httpError(null);
        this.loader = false;
        this.dialogRef.close({confirm: true});
      }
    );
  }

  getType() {
    if (this.data.type === 'edit') {
      this.formCreateProject = this.formBuilder.group({
        name: [this.data.project.name, [Validators.required]],
        projectManager: [this.data.project.projectManager.name, [Validators.required]],
        customerOwner: [this.data.project.customerOwner, [Validators.required]],
        description: [this.data.project.description, [Validators.required]],
        identify: [this.data.project.identify, [Validators.required]],
        workgroup: [this.data.project.workgroup, [Validators.required]]
      });
      this.formCreateProject.controls.workgroup.disable();
      this.formCreateProject.controls.customerOwner.disable();
      this.formCreateProject.controls.projectManager.disable();
    } else if (this.data.type === 'create' || this.data.type === 'epic') {
      this.formCreateProject = this.formBuilder.group({
        name: [null, [Validators.required]],
        projectManager: [null, [Validators.required]],
        customerOwner: [null, [Validators.required]],
        description: [null, [Validators.required]],
        identify: [null, [Validators.required]],
        workgroup: [null, [Validators.required]]
      });
      this.findFromProfile();
    }
  }

  findFromProfile() {
    this.loader = true;
    this.profileService.getProfile().subscribe(
      (response) => {
        if (response.status === 0) {
          this.loader = false;
          if (response.object != null) {
            this.profile = response.object.person;
            this.findAllWorkgroups();
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

  findAllWorkgroups() {
    this.loader = true;
    this.projectService.getAllWorkgroups().subscribe(
      (response) => {
        if (response.status === 0) {
          this.loader = false;
          if (response.object != null) {
            const list = response.object;
            list.map(workgroup => {
              this.workgroups.push({value: workgroup.id, viewValue: workgroup.name});
            });
            if (this.scopes.wpleader) {
              this.findAllMasters();
            } else if (this.scopes.wpmaster) {
              this.workgroups.map(workgroup => this.findManagersFromWorkgroup(workgroup.value));
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
    let data;
    if (this.data.type === 'create') {
      data = {
        name: this.formCreateProject.controls.name.value,
        description: this.formCreateProject.controls.description.value,
        identify: this.formCreateProject.controls.identify.value,
        projectManager: {
          personId: this.formCreateProject.controls.projectManager.value
        },
        team: {
          id: this.formCreateProject.controls.workgroup.value
        }
      };
    } else if (this.data.type === 'edit') {
      data = {
        id: this.data.project.id,
        name: this.formCreateProject.controls.name.value,
        description: this.formCreateProject.controls.description.value,
        identify: this.formCreateProject.controls.identify.value,
        projectManager: {
          personId: this.data.project.projectManager.personId
        },
        team: {
          id: this.data.project.team.id
        }
      };
    } else if (this.data.type === 'epic') {
      data = {
        parent: {
          id: this.data.project.id
        },
        name: this.formCreateProject.controls.name.value,
        description: this.formCreateProject.controls.description.value,
        identify: this.formCreateProject.controls.identify.value,
        projectManager: {
          personId: this.formCreateProject.controls.projectManager.value
        },
        team: {
          id: this.formCreateProject.controls.workgroup.value
        }
      };
    }
    this.loader = true;
    this.projectService.createProject(data).subscribe(
      (response) => {
        if (response.status === 0) {
          this.loader = false;
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
      case 'TEAM_INVALID_OR_INACTIVE':
        this._snackBar.openFromComponent(NotifyComponent,
          { data: { type: 'error', message: 'Workgroup inválido ou inativo.' }});
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
