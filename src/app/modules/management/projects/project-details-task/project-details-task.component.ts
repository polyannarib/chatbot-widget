import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ReportEditNoteComponent } from '../../report/report-edit-note/report-edit-note.component';
import { ReportEditComponent } from '../../report/report-edit/report-edit.component';

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
  ) { }

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

}
