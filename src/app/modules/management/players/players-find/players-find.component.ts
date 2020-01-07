import { Component, OnInit, Input } from '@angular/core';
import { PlayerService } from 'src/app/core/services/player.service';
import { format } from 'date-fns';
import { TaskService } from 'src/app/core/services/task.service';
import { NotifyComponent } from 'src/app/shared/components/notify/notify.component';
import { MatSnackBar } from '@angular/material';

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
  playerRatedFilter: any;

  playerAvailable: any;
  playerAvailableFilter: any;

  playerAllocated: any;
  playerSelect: any;

  constructor(
    private playerService: PlayerService,
    private taskService: TaskService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.findDesignatePlayers(this.taskId);
  }

  findDesignatePlayers(taskId) {
    this.loader = true;
    // this.playerService.findDesignatePlayers(taskId, format(dataInicial, 'dd-MM-yyyy'), format(dataFim, 'dd-MM-yyyy')).subscribe(
    this.playerService.findDesignatePlayers(taskId).subscribe(
      (response) => {
        this.playerRated = response.object.rated;
        this.playerRatedFilter = this.playerRated;

        this.playerAvailable = response.object.available;
        this.playerAvailableFilter = this.playerAvailable;

        this.onSearchChange('');

        this.loader = false;
      }, (err) => {
        this.loader = false;
      }
    )
  }

  onSubmit() {
    this.loader = true;
    this.taskService.assignTask(this.taskId, this.playerSelect).subscribe(
      (response) => {
        if(response.status == 0) {
          this._snackBar.openFromComponent(NotifyComponent, 
            { data: { type: 'success', message: 'Tarefa designada com sucesso!' }});
          this.loader = false;
          return;
        }
        this._snackBar.openFromComponent(NotifyComponent, 
          { data: { type: 'error', message: 'Problemas ao designar a tarefa!' }});
        this.loader = false;
      }, (err) => {
        this._snackBar.openFromComponent(NotifyComponent, 
          { data: { type: 'error', message: 'Problemas ao designar a tarefa!' }});
        this.loader = false;
      }
    )
  }

  onSearchChange(searchValue: string): void {
    if(this.playerRated != null){
      this.playerRatedFilter = this.playerRated.filter(
        (curr) => {
          return curr.name.toUpperCase().includes(searchValue.toUpperCase());
        }
      )
      this.playerRatedFilter.splice(5,this.playerRatedFilter.length);
    }
    if(this.playerAvailable != null){
      this.playerAvailableFilter = this.playerAvailable.filter(
        (curr) => {
          return curr.name.toUpperCase().includes(searchValue.toUpperCase());
        }
      )
      this.playerAvailableFilter.splice(5,this.playerAvailableFilter.length);
    }

  }


}
