import { Component, OnInit, ViewChild } from '@angular/core';
import { PlayerService } from 'src/app/core/services/player.service';
import { CardService } from 'src/app/core/services/card.service';
import { Router } from '@angular/router';
import { MzModalComponent } from 'ngx-materialize';
import { MatDialog } from '@angular/material';
import { SucessComponent } from 'src/app/shared/components/modal/sucess/sucess.component';
import { ErrorComponent } from 'src/app/shared/components/modal/error/error.component';

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.css']
})
export class PlayersListComponent implements OnInit {

  // @ViewChild('auto') auto;

  constructor(
    // private modalService: MzModalService,
    private playerService: PlayerService,
    private cardService: CardService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  players: any;
  cards: any;
  cardsPlayers: any;
  arrayCards: any[] = [];
  playerId: number;
  cardPlayerSelect: any;
  cardId: number;

  loader: boolean = false
  loaderConfirm: boolean = false;

  ngOnInit() {
    this.findAllPlayers();
  }

  // clear(e): void {
  //   e.stopPropagation();
  //   this.auto.clear();
  // }

  findAllPlayers() {
    this.loader = true;
    this.playerService.findAllPlayers().subscribe(
      (response) => {
        if(response.status == 0) {
          this.players = response.object.list;
          this.loader = false;
          return;
        }
        this.loader = false;
        this.error('Problemas ao trazer a lista de players, contate o administrador');
        this.router.navigate(['/admin']);
      }, (err) => {
        this.loader = false;
        this.error('Problemas ao trazer a lista de players, contate o administrador');
        this.router.navigate(['/admin']);
      }
    )
  }

  // findAllCards() {
  //   this.loader = true;
  //   this.cardService.findAllCards().subscribe(
  //     (response) => {
  //       if(response.status == 0) {
  //         this.cards = response.object;
  //         this.loader = false;
  //         return;
  //       }
  //       this.loader = false;
  //       this.error('Problemas ao trazer a lista de players, contate o administrador');
  //       this.router.navigate(['/admin']);
  //     }, (err) => {
  //       this.loader = false;
  //       this.error('Problemas ao trazer a lista de players, contate o administrador');
  //       this.router.navigate(['/admin']);
  //     }
  //   )
  // }

  // selectEvent() {
  //   document.querySelector("input").value = '';
  //   if(this.cardPlayerSelect != null) {
  //     this.arrayCards.push({
  //       "playerId": this.playerId,
  //       "cardId": this.cardPlayerSelect.cardId,
  //       "action": "ADD"
  //     });
  //     this.cardsPlayers.push(this.cardPlayerSelect);
  //     this.auto.clear();
  //   } else {
  //     return;
  //   }
  // }

  // listCardsByPlayer(id) {
  //   this.playerId = id;
  //   this.cardService.listCardByPlayer(id).subscribe(
  //     (response) => {
  //       this.cardsPlayers = response.object;
  //     }, (err) => {

  //     }
  //   )
  // }

  // confirmFinalize() {
  //   this.loaderConfirm = true;
  //   this.cardService.giveToPlayer(this.arrayCards).subscribe(
  //     (response) => {
  //       this.loaderConfirm = false;
  //       this.success('Problemas ao trazer a lista de players, contate o administrador');
  //     }, (err) => {
  //       this.loader = false;
  //       this.error('Problemas ao trazer a lista de players, contate o administrador');
  //     }
  //   )
  // }

  success(dataText: string) {
    return this.dialog.open(SucessComponent, { width: '40vw', data: dataText });
  }

  error(dataText: string) {
    return this.dialog.open(ErrorComponent, { width: '40vw', data: dataText });
  }

}
