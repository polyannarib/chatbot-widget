import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PlayerService } from 'src/app/core/services/player.service';
import { format, eachDayOfInterval, addDays, subDays } from 'date-fns';
import { PageEvent, MatDialog, MatSnackBar } from '@angular/material';
import { ResourceDetailsComponent } from '../resource-details/resource-details.component';
import { NotifyComponent } from 'src/app/shared/components/notify/notify.component';
import { ProfileService } from 'src/app/core/services/profile.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.css']
})
export class ResourceListComponent implements OnInit {

  @Output() loaderResource = new EventEmitter();

  players: any;
  daysOfWeek13: any;
  filteredPlayers: any;
  pageLength: number;
  pageSizeOptions: number[] = [10, 25, 50];
  loader: boolean = false;
  loaderDays: boolean = false;
  numberOfDays = 8;

  pageSize: number = 20;
  page: number;
  totalFound: number;

  searchResources: FormGroup;

  playersListOptions: any;

  startDate = new Date(Date.now());
  endDate = addDays(new Date(Date.now()), this.numberOfDays);

  mainStyle = this.profileService.getAppMainColor();
  secondarytyle = this.profileService.getAppSecondaryColor();

  constructor(
    private playerService: PlayerService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private profileService: ProfileService,
    private formBuilder: FormBuilder  
  ) { }

  ngOnInit() {
    this.daysOfWeek(this.startDate, this.endDate);
    this.findPlayers();

    this.searchResources = this.formBuilder.group({
      name: ['']
    })
  }

  daysOfWeek(start, end) {
    this.daysOfWeek13 = eachDayOfInterval({
      start: start,
      end: end
    })
  }

  findPlayers() {
    this.loader = true;
    this.loaderResource.emit(true);
    let params = {
      "startDate": format(this.startDate, 'dd-MM-yyyy'),
      "page": this.page ? this.page : 1,
      "pageSize": this.pageSize
    }
    this.playerService.findPlayers(params).subscribe(
      (response) => {
        if(response.status == 0) {
          this.loader = false;
          this.players = response.object.list;
          this.playersListOptions = response.object;
          this.filteredPlayers = this.players;
          this.pageSize = response.object.pageSize;
          this.page = response.object.page;
          this.totalFound = response.object.totalFound;

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

  onSearchResources() {
    this.loader = true;
    this.loaderResource.emit(true);

    let params = {
      startDate: format(this.startDate, 'dd-MM-yyyy'),
      name: this.searchResources.value.name,
      pageSize: this.pageSize,
      page: 1
    }

    this.playerService.findPlayers(params).subscribe(
      (response) => {
        if (response.status == 0) {
          this.loader = false;
          this.players = response.object.list;
          this.playersListOptions = response.object;
          this.filteredPlayers = this.players;
          this.pageSize = response.object.pageSize;
          this.page = response.object.page;
          this.totalFound = response.object.totalFound;
        }
        else {
          this.httpError(response.message);
          this.loader = false;
        }
      },
      (error) => {
        this.httpError(null);
        this.loader = false;
      }
    )
  }

  modalResourceDetails(playerId, activity) {
    const dataSend = {
      playerId: playerId,
      activityDate: new Date(activity.referenceDate)
    }
    const dialogRef = this.dialog.open(ResourceDetailsComponent, {
      width: '90vw',
      data: dataSend
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.findPlayers();
    });
  }

  changeDays(date) {
    this.loaderDays = true;
    if (date == 'prev') {
      this.endDate = this.startDate;
      this.startDate = subDays(this.startDate, this.numberOfDays);
      this.daysOfWeek(this.startDate, this.endDate);
      this.findPlayers();
      this.loaderDays = false;
    } if (date == 'next') {
      this.startDate = this.endDate;
      this.endDate = addDays(this.startDate, this.numberOfDays);
      this.daysOfWeek(this.startDate, this.endDate);
      this.findPlayers();
      this.loaderDays = false;
    }
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

  updatePage(value) {
    this.page = value;
    this.findPlayers();
  }

}
