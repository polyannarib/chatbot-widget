import { Component, OnInit, Input } from '@angular/core';
import { PlayerService } from 'src/app/core/services/player.service';
import { format } from 'date-fns';

@Component({
  selector: 'app-players-find',
  templateUrl: './players-find.component.html',
  styleUrls: ['./players-find.component.css']
})
export class PlayersFindComponent implements OnInit {

  @Input() taskId: number;
  @Input() dataInicial: any;
  @Input() dataFim: any;

  loader: boolean = false;
  playerRated: any;
  playerAllocated: any;

  constructor(
    private playerService: PlayerService
  ) { }

  ngOnInit() {
    this.findDesignatePlayers(this.taskId, this.dataInicial, this.dataFim);
  }

  findDesignatePlayers(taskId, dataInicial, dataFim) {
    this.loader = true;
    this.playerService.findDesignatePlayers(taskId, format(dataInicial, 'dd-MM-yyyy'), format(dataFim, 'dd-MM-yyyy')).subscribe(
      (response) => {
        console.log(response);
        console.log(response.object);
        // this.playerRated = response.object.rated;
        // this.playerAllocated = response.object.allocated;
        this.loader = false;
      }, (err) => {
        this.loader = false;
      }
    )
  }

}
