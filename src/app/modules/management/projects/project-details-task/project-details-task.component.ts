import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ReportEditNoteComponent } from '../../report/report-edit-note/report-edit-note.component';
import { ReportEditComponent } from '../../report/report-edit/report-edit.component';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';


/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [
      {name: 'Apple'},
      {name: 'Banana'},
      {name: 'Fruit loops'},
    ]
  }, {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [
          {name: 'Broccoli'},
          {name: 'Brussels sprouts'},
        ]
      }, {
        name: 'Orange',
        children: [
          {name: 'Pumpkins'},
          {name: 'Carrots'},
        ]
      },
    ]
  },
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-project-details-task',
  templateUrl: './project-details-task.component.html',
  styleUrls: ['./project-details-task.component.css']
})
export class ProjectDetailsTaskComponent implements OnInit {

  projectTasks: any;

  constructor(
    public dialogRef: MatDialogRef<ProjectDetailsTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog
  ) { 
    this.dataSource.data = TREE_DATA;
  }

  ngOnInit() { }

  openReport(project) {
    const dataSend = {
      project: project
    }
    const dialogRef = this.dialog.open(ReportEditComponent, {
      width: '90vw',
      data: dataSend
    });
    // dialogRef.afterClosed().subscribe(
    // (result) => {
    //   this.findProjects();
    // });
  }

  /* ----------------------------------------------------------------- */
  /* ----------------------------------------------------------------- */
  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }
  
  treeControl = new FlatTreeControl<ExampleFlatNode>( node => node.level, node => node.expandable );
  treeFlattener = new MatTreeFlattener( this._transformer, node => node.level, node => node.expandable, node => node.children );
  
  dataSource = new MatTreeFlatDataSource( this.treeControl, this.treeFlattener );
  
  hasChild = ( _: number, node: ExampleFlatNode ) => node.expandable;

}
