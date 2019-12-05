import { Component, OnInit, ViewChild } from '@angular/core';
import { PlayerService } from '../../shared/services/player.service';
import { LoadingService } from '../../shared/services/loading.service';
import { MzModalService, MzModalComponent } from 'ngx-materialize';
import { ModalErrorComponent } from '../../modal/error/modal-error.component';
import { CardService } from '../../shared/services/card.service';
import { ModalSuccessComponent } from '../../modal/success/modal-success.component';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {

  @ViewChild('auto') auto;

  constructor(
    private playerService: PlayerService,
    private loadingService: LoadingService,
    private modalService: MzModalService,
    private cardService: CardService,
    
  ) { }

  players: any;
  cards: any;
  cardsPlayers: any;
  arrayCards: any[] = [];
  playerId: number;
  cardPlayerSelect: any;
  cardId: number;

  ngOnInit() {
    this.findAllPlayers();
  }

  clear(e): void {
    e.stopPropagation();
    this.auto.clear();
  }

  findAllPlayers() {
    this.loadingService.showPreloader();
    this.playerService.findAllPlayers().subscribe(
      (response) => {
        this.loadingService.hidePreloader();
        this.players = response.object.list;
      }, (err) => {
        this.loadingService.hidePreloader();
        this.modalService.open(ModalErrorComponent);
      }
    )
  }

  findAllCards() {
    this.cardService.findAllCards().subscribe(
      (response) => {
        this.cards = response.object;
        console.log('------- cardsPlayer -------');
        console.log(this.cards);
      }, (err) => {

      }
    )
  }

  selectEvent() {
    document.querySelector("input").value = '';
    if(this.cardPlayerSelect != null) {
      this.arrayCards.push({
        "playerId": this.playerId,
        "cardId": this.cardPlayerSelect.cardId,
        "action": "ADD"
      });
      this.cardsPlayers.push(this.cardPlayerSelect);
      this.auto.clear();
    } else {
      return;
    }
  }

  listCardsByPlayer(id) {
    this.playerId = id;
    this.cardService.listCardByPlayer(id).subscribe(
      (response) => {
        this.cardsPlayers = response.object;
      }, (err) => {

      }
    )
  }

  openModalCards(modal: MzModalComponent, id: Number) {
    this.findAllCards();
    this.listCardsByPlayer(id);
    modal.openModal();
  }

  confirmFinalize() {
    this.loadingService.showPreloader();
    this.cardService.giveToPlayer(this.arrayCards).subscribe(
      (response) => {
        this.loadingService.hidePreloader();
        this.modalService.open(ModalSuccessComponent);
      }, (err) => {
        this.loadingService.hidePreloader();
        this.modalService.open(ModalErrorComponent);
      }
    )
  }


}
