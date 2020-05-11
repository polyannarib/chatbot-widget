import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ReportEditNoteComponent } from '../../report/report-edit-note/report-edit-note.component';
import { ReportEditComponent } from '../../report/report-edit/report-edit.component';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { TaskCreateComponent } from '../../task/task-create/task-create.component';
import { RemoveTaskComponent } from 'src/app/shared/components/modal/remove-task/remove-task.component';
import { TaskService } from 'src/app/core/services/task.service';


/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
// interface FoodNode {
//   name: string;
//   children?: FoodNode[];
// }

// const TREE_DATA: any = [
//   {
//     name: 'Fruit',
//     children: [
//       {name: 'Apple'},
//       {name: 'Banana'},
//       {name: 'Fruit loops'},
//     ]
//   }, {
//     name: 'Vegetables',
//     children: [
//       {
//         name: 'Green',
//         children: [
//           {name: 'Broccoli'},
//           {name: 'Brussels sprouts'},
//         ]
//       }, {
//         name: 'Orange',
//         children: [
//           {name: 'Pumpkins'},
//           {name: 'Carrots'},
//         ]
//       },
//     ]
//   },
// ];

/** Flat node with expandable and level information */
// interface ExampleFlatNode {
//   expandable: boolean;
//   name: string;
//   level: number;
// }

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

  constructor(
    public dialogRef: MatDialogRef<ProjectDetailsTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private taskService: TaskService
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
      card: node.card ? node.card.name : '',
      previewedAt: node.previewedAt ? node.previewedAt : '',
      expectedAt: node.expectedAt ? node.expectedAt : '',
      status: this.getColor(node.status),
      type: node.type,
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

  addTask(type) {
    let nodeType;
    if(type) nodeType = type
    const dataSend = {
      project: this.data.project,
      nodeType
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

  editTask() {
    const dataSend = {
      project: this.data.project
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

  removeTask() {
    const dataSend = {
      project: this.data.project
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

}