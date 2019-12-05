import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../shared/services/player.service';
import { LoadingService } from '../../shared/services/loading.service';
import { MzModalService, MzModalComponent } from 'ngx-materialize';
import { ModalErrorComponent } from '../../modal/error/modal-error.component';
import { CardService } from '../../shared/services/card.service';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {

  constructor(
    private playerService: PlayerService,
    private loadingService: LoadingService,
    private modalService: MzModalService,
    private cardService: CardService
  ) { }

  players: any;
  cards: any;
  cardsPlayers: any;
  arrayCards: any[] = [];

  ngOnInit() {
    this.findAllPlayers();
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

  listCardsByPlayer(id) {
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
    console.log('confirm');
  }


}
