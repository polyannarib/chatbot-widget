import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/core/services/player.service';
import { format, eachDayOfInterval, addDays } from 'date-fns';

@Component({
  selector: 'app-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.css']
})
export class ResourceListComponent implements OnInit {

  filteredPlayers: any;
  daysOfWeek13: any;

  constructor(
    private playerService: PlayerService
  ) { }

  ngOnInit() {
    this.daysOfWeek13 = eachDayOfInterval({
      start: new Date(Date.now()),
      end: addDays(new Date(Date.now()), 13)
    })
    this.filterPlayers();
  }

  filterPlayers() {
    let params = {
      "startDate": format(new Date(Date.now()), 'dd-MM-yyyy'),
      "page": 1,
      "pageSize": 10
    }
    this.playerService.findPlayers(params).subscribe(
      (response) => {
        this.filteredPlayers = response.object.list;
      }, (err) => {
        console.log('------- err -------');
        console.log(err);
      }
    );
  }

}
