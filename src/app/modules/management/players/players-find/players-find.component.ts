import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PlayerService } from 'src/app/core/services/player.service';
import { format } from 'date-fns';
import { TaskService } from 'src/app/core/services/task.service';
import { NotifyComponent } from 'src/app/shared/components/notify/notify.component';
import { MatSnackBar } from '@angular/material';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-players-find',
  templateUrl: './players-find.component.html',
  styleUrls: ['./players-find.component.css']
})
export class PlayersFindComponent implements OnInit {

  @Output() taskDesignatedSucess = new EventEmitter();
  @Input() taskId: number;
  @Input() dataInicial: any;
  @Input() dataFim: any;
  @Input() cards: any;

  loader: boolean = false;
  mainStyle = this.profileService.getAppMainColor();

  searchPlayers: any;
  searchPlayersFilter: any;

  playerSelect: any;

  playerRated: any;
  playerRatedFilter: any;
  playerAvailable: any;
  playerAvailableFilter: any;
  playerAllocated: any;
  playerAvailableOverGroup: any;
  playerAvailableOverGroupFilter: any;

  constructor(
    private playerService: PlayerService,
    private taskService: TaskService,
    private _snackBar: MatSnackBar,
    private profileService: ProfileService
  ) { }

  ngOnInit() {
    this.findDesignatePlayers(this.taskId);
  }

  findDesignatePlayers(taskId) {
    this.loader = true;
    // this.playerService.findDesignatePlayers(taskId, format(dataInicial, 'dd-MM-yyyy'), format(dataFim, 'dd-MM-yyyy')).subscribe(
    this.playerService.findDesignatePlayers(taskId).subscribe(
      (response) => {
        // this.searchPlayers = response.object;
        // this.searchPlayersFilter = response.object;
        // this.playerRatedFilter = this.playerRated;
        // this.playerAvailable = response.object.available;
        // this.playerAvailableFilter = this.playerAvailable;
        // this.onSearchChange('');

        this.playerRated = response.object;
        this.playerRatedFilter = this.playerRated;

        // this.playerAvailable = response.object.map(element => element.onTeam == true);
        // this.playerAvailableFilter = this.playerAvailable;
        
        // this.playerAvailableOverGroup = response.object.map(element => element.onTeam == false);
        // this.playerAvailableOverGroupFilter = this.playerAvailableOverGroup;
        
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
          this.taskDesignatedSucess.emit(true);
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
    if(this.playerRated != null) {
      this.playerRatedFilter = this.playerRated.filter(
        (curr) => {
          return curr.name.toUpperCase().includes(searchValue.toUpperCase());
        }
      )
      this.playerRatedFilter.splice(5,this.playerRatedFilter.length);
    }
    if(this.playerAvailable != null) {
      this.playerAvailableFilter = this.playerAvailable.filter(
        (curr) => {
          return curr.name.toUpperCase().includes(searchValue.toUpperCase());
        }
      )
      this.playerAvailableFilter.splice(5,this.playerAvailableFilter.length);
    }
    if(this.playerAvailableOverGroup != null) {
      this.playerAvailableOverGroupFilter = this.playerAvailableOverGroup.filter(
        (curr) => {
          return curr.name.toUpperCase().includes(searchValue.toUpperCase());
        }
      )
      this.playerAvailableOverGroupFilter.splice(5,this.playerAvailableOverGroupFilter.length);
    }
  }

  selectedFilter(valueFilter) {
    if(valueFilter == 'playersTeam') {
      this.playerRatedFilter = this.playerRated.filter(element => element.onTeam == true);
      this.playerRatedFilter.splice(5,this.playerRatedFilter.length);
    }
    if(valueFilter == 'playersCards') {
      const cards = this.cards.map(element => element.name);
      this.playerRatedFilter = this.playerRated.filter((element) => {
        cards.forEach(cardsName => {
          if(element[cardsName] && element[cardsName] == 1) {
            return element;
          }
        })
      })
      this.playerRatedFilter.splice(5,this.playerRatedFilter.length);
    }
  }

  playerValid() {
    if(!this.playerSelect) {
      return true;
    }
    return false;
  }

  // -----------------------------------------------
  // onSearchChange(searchValue: string): void {
  //   this.searchPlayersFilter = this.searchPlayers.filter((element, index) => element.list.map((curr) => { 
  //     if(curr.name.toUpperCase().includes(searchValue.toUpperCase())) {
  //       console.log('Entrou dentro do IF')
  //       console.log(curr)
  //       return curr
  //     }
  //   }).splice(5, this.searchPlayers[index].list.length) )
  //   console.log('--------------')
  //   console.log(this.searchPlayersFilter)
  // }


}
