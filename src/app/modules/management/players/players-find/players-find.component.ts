import { Component, OnInit, Input } from '@angular/core';
import { PlayerService } from 'src/app/core/services/player.service';

@Component({
  selector: 'app-players-find',
  templateUrl: './players-find.component.html',
  styleUrls: ['./players-find.component.css']
})
export class PlayersFindComponent implements OnInit {

  @Input() taskId: number;

  loader: boolean = false;
  playerRated: any;
  playerAllocated: any;

  constructor(
    private playerService: PlayerService
  ) { }

  ngOnInit() {
    this.findDesignatePlayers(this.taskId);
  }

  findDesignatePlayers(taskId) {
    // this.open = true;
    this.loader = true;
    this.playerService.findDesignatePlayers(taskId).subscribe(
      (response) => {
        console.log('------ response findDesignatePlayers ------');
        console.log(response);
        this.playerRated = response.object.rated;
        this.playerAllocated = response.object.allocated;
        this.loader = false;
      }, (err) => {
        this.loader = false;
        console.log('------ err ------');
        console.log(err);
      }
    )
  }

}
