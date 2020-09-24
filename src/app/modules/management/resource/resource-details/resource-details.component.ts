import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TaskService } from 'src/app/core/services/task.service';
import { format } from 'date-fns';
import { ProfileService } from 'src/app/core/services/profile.service';
import { EditTaskHourComponent } from 'src/app/shared/components/modal/edit-task-hour/edit-task-hour.component';

@Component({
  selector: 'app-resource-details',
  templateUrl: './resource-details.component.html',
  styleUrls: ['./resource-details.component.css']
})
export class ResourceDetailsComponent implements OnInit {

  playerActivity: any;
  findTask: any;
  loader: boolean = false;
  progress: any;
  mainStyle = this.profileService.getAppMainColor();
  secoundStyle = this.profileService.getAppSecondaryColor();
  tasksList: any;
  descriptionExpanded = [];

  constructor(
    public dialogRef: MatDialogRef<ResourceDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private taskService: TaskService,
    private profileService: ProfileService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.findTasks();
  }
  
  findTasks() {
    this.loader = true;
    this.taskService.findTasks(this.data.playerId, format(this.data.activityDate, 'dd-MM-yyyy')).subscribe(
      (response) => {
        this.playerActivity = response.object.player;
        this.tasksList = response.object.player.tasks;
        this.progress = response.object.progress;
        this.loader = false;
      }, (err) => {
        this.loader = false;
      }
    );
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

  getCardName(cards): string {
    if(cards && cards != []) {
      const nameCard = cards.map(element => element.cardName);
      return nameCard.join(', ');
    }
    return '';
  }

  loadPriorDay() {
    this.data.activityDate.setDate(this.data.activityDate.getDate() - 1);
    this.findTasks();
  }

  loadNextDay() {
    this.data.activityDate.setDate(this.data.activityDate.getDate() + 1);
    this.findTasks();
  }

  openEditHours(activity) {
    const diag = this.dialog.open(EditTaskHourComponent, {width: '500px', data: activity});

    diag.afterClosed().subscribe(
      res => {
        if (res === true) {
          this.findTasks();
        }
      }
    )
  }
}
