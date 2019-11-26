import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PlayerService } from 'src/app/core/services/player.service';
import { format, eachDayOfInterval, addDays } from 'date-fns';
import { PageEvent, MatDialog } from '@angular/material';
import { ResourceDetailsComponent } from '../resource-details/resource-details.component';

@Component({
  selector: 'app-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.css']
})
export class ResourceListComponent implements OnInit {

  players: any;
  daysOfWeek13: any;
  filteredPlayers: any;
  pageLength: number;
  pageSize: number;
  pageSizeOptions: number[] = [10, 25, 50];
  loader: boolean = false;

  constructor(
    private playerService: PlayerService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.daysOfWeek13 = eachDayOfInterval({
      start: new Date(Date.now()),
      end: addDays(new Date(Date.now()), 12)
    })
    this.findPlayers();
  }

  findPlayers() {
    this.loader = true;
    let params = {
      "startDate": format(new Date(Date.now()), 'dd-MM-yyyy'),
      "page": 1,
      "pageSize": 10
    }
    this.playerService.findPlayers(params).subscribe(
      (response) => {
        this.loader = false;
        this.players = response.object.list;
      }, (err) => {
        this.loader = false;
        console.log('------- err -------');
        console.log(err);
      }
    );
  }

  onSearchChangeResource(searchValue: string): void {
    this.players = this.players.filter(
      (curr) => {
        return curr.name.toUpperCase().includes(searchValue.toUpperCase());
      }
    )
  }

  modalResourceDetails(playerId, activity): void {
    const dataSend = {
      playerId: playerId,
      activityDate: new Date(activity.year, activity.month, activity.day)
    }
    const dialogRef = this.dialog.open(ResourceDetailsComponent, {
      width: '90vw',
      data: dataSend
    });
  }

}
