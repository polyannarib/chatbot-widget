import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/core/services/player.service';
import { format, eachDayOfInterval, addDays } from 'date-fns';

@Component({
  selector: 'app-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.css']
})
export class ResourceListComponent implements OnInit {

  players: any;
  daysOfWeek13: any;
  filteredPlayers: any;

  constructor(
    private playerService: PlayerService
  ) { }

  ngOnInit() {
    this.daysOfWeek13 = eachDayOfInterval({
      start: new Date(Date.now()),
      end: addDays(new Date(Date.now()), 12)
    })
    this.findPlayers();
  }

  findPlayers() {
    let params = {
      "startDate": format(new Date(Date.now()), 'dd-MM-yyyy'),
      "page": 1,
      "pageSize": 10
    }
    this.playerService.findPlayers(params).subscribe(
      (response) => {
        this.players = response.object.list;
      }, (err) => {
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

}
