import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSnackBar } from '@angular/material';
import { ReportEditNoteComponent } from '../../report/report-edit-note/report-edit-note.component';
import { ReportEditComponent } from '../../report/report-edit/report-edit.component';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { TaskCreateComponent } from '../../task/task-create/task-create.component';
import { RemoveTaskComponent } from 'src/app/shared/components/modal/remove-task/remove-task.component';
import { TaskService } from 'src/app/core/services/task.service';
import { TaskDetailsComponent } from '../../task/task-details/task-details.component';
import { ProfileService } from 'src/app/core/services/profile.service';
import { ProjectCreateComponent } from '../project-create/project-create.component';
import {Validators} from "@angular/forms";
import { NotifyComponent } from 'src/app/shared/components/notify/notify.component';

@Component({
  selector: 'app-project-details-task',
  templateUrl: './project-details-task.component.html',
  styleUrls: ['./project-details-task.component.css']
})
export class ProjectDetailsTaskComponent implements OnInit {

  projectTasks: any;
  loader: boolean = false;
  tasks: any;
  types: any;
  mainStyle = this.profileService.getAppMainColor();
  secoundStyle = this.profileService.getAppSecondaryColor();

  constructor(
    public dialogRef: MatDialogRef<ProjectDetailsTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private taskService: TaskService,
    private profileService: ProfileService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getTypes();
    this.getTasks(this.data.project.id);
  }

  getTasks(id) {
    this.loader = true;
    this.taskService.getTasksByProject(id).subscribe(
      (response) => {
        if(response.status == 0) {          
          this.tasks = response.object;
          this.dataSource.data = this.tasks;
          this.loader = false;
          return;
        }
        this.loader = false;
      }, (err) => {
        this.loader = false;
      }
    );
  }

  /* ----------------------------------------------------------------- */
  /* ----------------------------------------------------------------- */
  private _transformer = (node: any, level: number) => {
    return {
      expandable: !!node.tasksSons && node.tasksSons.length > 0,
      name: node.name,
      id: node.id,
      allocated: node.allocated ? node.allocated : '',
      effort: node.effort ? node.effort : '',
      cards: node.cards,
      status: node.status,
      type: node.type,
      rule: node.rule,
      description: node.description ? node.description : '',
      previewedAt: node.previewedAt ? node.previewedAt : '',
      expectedAt: node.expectedAt ? node.expectedAt : null,
      duration: node.duration,
      dailyEffort: node.dailyEffort ? node.dailyEffort : '',
      validDay: node.validDay ? node.validDay : '',
      warning: node.warning ? node.warning : '',
      referenceDate: node.referenceDate ? node.referenceDate : '',
      style: node.style ? node.style : '',
      player: node.player ? node.player : null,
      parentId: node.parentId ? node.parentId : null,
      links: node.links ? node.links : null,
      level: level,
    };
    // return {
    //   expandable: !!node.children && node.children.length > 0,
    //   name: node.name,
    //   level: level,
    // };
  }

  treeControl = new FlatTreeControl<any>( node => node.level, node => node.expandable );
  treeFlattener = new MatTreeFlattener( this._transformer, node => node.level, node => node.expandable, node => node.tasksSons );
  dataSource = new MatTreeFlatDataSource( this.treeControl, this.treeFlattener );
  hasChild = ( _: number, node: any ) => node.expandable;

  addTask(type?, id?) {
    let dataSend: any;
    if(type && id) {
      dataSend = {
        project: this.data.project,
        type,
        parentId: id
      }
    } else {
      dataSend = {
        project: this.data.project
      }
    }
    const dialogRef = this.dialog.open(TaskCreateComponent, {
      width: '600px',
      data: dataSend
    });
    dialogRef.afterClosed().subscribe(
      (result) => {
        this.getTasks(this.data.project.id);
    });
  }

  editTask(node) {
    if(node.status == 'WAITING' || node.status == 'EXECUTION') {
      this._snackBar.openFromComponent(NotifyComponent,
        { data: { type: 'error', message: 'Não é possivel editar tarefas em andamento' }});
      return;
    }
    const dataSend = {
      project: this.data.project,
      task: node
    }
    const dialogRef = this.dialog.open(TaskDetailsComponent, {
      width: '600px',
      data: dataSend
    });
    dialogRef.afterClosed().subscribe(
      (result) => {
        this.getTasks(this.data.project.id);
    });
  }

  removeTask(task) {
    const dataSend = {
      project: this.data.project,
      task
    }
    const dialogRef = this.dialog.open(RemoveTaskComponent, {
      width: '500px',
      data: dataSend
    });
    dialogRef.afterClosed().subscribe(
    (result) => {
      this.getTasks(this.data.project.id);
    });
  }

  openReport() {
    const dataSend = {
      project: this.data.project
    }
    const dialogRef = this.dialog.open(ReportEditComponent, {
      width: '90vw',
      data: dataSend
    });
    dialogRef.afterClosed().subscribe(
    (result) => {
      this.getTasks(this.data.project.id);
    });
  }

  editProject() {
    const dataSend = {
      type: 'edit',
      project: this.data.project
    };
    const dialogRef = this.dialog.open(ProjectCreateComponent, {
      width: '600px',
      data: dataSend
    });
  }

  createEpic() {
    const dataSend = {
      type: 'epic',
      project: this.data.project
    };
    const dialogRef = this.dialog.open(ProjectCreateComponent, {
      width: '600px',
      data: dataSend
    });
  }

  getColor(color) {
    switch (color) {
      case 'BUILDING':
        return '#494947';
      case 'WAITING':
        return '#FFC53E';
      case 'EXECUTION':
        return '#0085B2';
      case 'FINISHED':
        return '#00D69D';
      case 'HANGING':
        return '#C9133E';
      case 'WAITING EXECUTION':
        return '#949396';
      case 'DELAYED':
        return '#A50104';
      default:
        return '#000';
    }
  }

  getTypes() {
    this.taskService.getTypesTask().subscribe(
      (response) => {
        this.types = response.object.map(element => element.level);
    })
  }

  typeSon(type): boolean {
    const levelSon = type.level + 1;
    if(this.types.includes(levelSon)) {
      return true;
    }
    return false;
  }

  getCardName(card?) {
    if(card && card != []) {
      const nameCard = card.map(element => element.cardName);
      return nameCard.join(', ');
    }
    return '';
  }

  openEditProject() {
    const dataSend = {
      projectId: this.data.project.id,
      project: this.data.project
    };
    const dialogRef = this.dialog.open(ProjectCreateComponent, {
      width: '90vw',
      data: dataSend
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getTasks(this.data.project.id);
    });
  }

  isStatus(status) {
    if(status == 'BUILDING' || status == 'WAITING') {
      return false;
    }
    return true;
  }

}
