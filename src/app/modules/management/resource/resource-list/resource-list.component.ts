import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PlayerService } from 'src/app/core/services/player.service';
import { format, eachDayOfInterval, addDays, subDays } from 'date-fns';
import { PageEvent, MatDialog } from '@angular/material';
import { ResourceDetailsComponent } from '../resource-details/resource-details.component';

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
  pageSize: number;
  pageSizeOptions: number[] = [10, 25, 50];

  loader: boolean = false;
  loaderDays: boolean = false;

  startDate = new Date(Date.now());
  endDate = addDays(new Date(Date.now()), 12);

  constructor(
    private playerService: PlayerService,
    public dialog: MatDialog
  ) {
    // this.startDate = new Date(Date.now());
    // this.endDate = addDays(new Date(Date.now()), 12);
  }

  ngOnInit() {
    this.daysOfWeek(this.startDate, this.endDate);
    this.findPlayers();
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
      "page": 1,
      "pageSize": 10
    }
    this.playerService.findPlayers(params).subscribe(
      (response) => {
        this.loader = false;
        this.loaderResource.emit(false);
        this.players = response.object.list;
        this.filteredPlayers = this.players;
      }, (err) => {
        this.loader = false;
        this.loaderResource.emit(false);
      }
    );
  }

  onSearchChangeResource(searchValue: string): void {
    let PlayersFilters = this.players;
    PlayersFilters = this.players.filter((curr) => { return curr.name.toUpperCase().includes(searchValue.toUpperCase()) })
    this.filteredPlayers = PlayersFilters;
  }

  modalResourceDetails(playerId, activity) {
    // activity.month = activity.month-1;
    const dataSend = {
      playerId: playerId,
      activityDate: new Date(activity.referenceDate)
    }
    const dialogRef = this.dialog.open(ResourceDetailsComponent, {
      width: '90vw',
      data: dataSend
    });
  }

  changeDays(date) {
    this.loaderDays = true;
    if (date == 'prev') {
      this.endDate = this.startDate;
      this.startDate = subDays(this.startDate, 12);
      this.daysOfWeek(this.startDate, this.endDate);
      this.findPlayers();
      this.loaderDays = false;
    } if (date == 'next') {
      this.startDate = this.endDate;
      this.endDate = addDays(this.startDate, 12);
      this.daysOfWeek(this.startDate, this.endDate);
      this.findPlayers();
      this.loaderDays = false;
    }
  }

}
