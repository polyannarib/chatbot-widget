import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { CardService } from 'src/app/core/services/card.service';
import { SucessComponent } from 'src/app/shared/components/modal/sucess/sucess.component';
import { ErrorComponent } from 'src/app/shared/components/modal/error/error.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-card-list-player',
  templateUrl: './card-list-player.component.html',
  styleUrls: ['./card-list-player.component.css']
})
export class CardListPlayerComponent implements OnInit {

  @ViewChild('auto') auto;

  cards: any;
  arrayCards: any[] = [];
  cardPlayerSelect: any;
  playerId: number;
  cardsPlayers: any;
  
  loader: boolean = false;
  
  constructor(
    private cardService: CardService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<CardListPlayerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.listCardsByPlayer(this.data.playerId);
  }

  findAllCards() {
    this.loader = true;
    this.cardService.findAllCards().subscribe(
      (response) => {
        if(response.status == 0) {
          this.cards = response.object;
          this.loader = false;
          return;
        }
        this.loader = false;
        this.error('Problemas ao trazer a lista de players, contate o administrador');
        // this.router.navigate(['/admin']);
      }, (err) => {
        this.loader = false;
        this.error('Problemas ao trazer a lista de players, contate o administrador');
        // this.router.navigate(['/admin']);
      }
    )
  }

  confirmFinalize() {
    this.loader = true;
    this.cardService.giveToPlayer(this.arrayCards).subscribe(
      (response) => {
        this.loader = false;
        this.success('Problemas ao trazer a lista de players, contate o administrador');
      }, (err) => {
        this.loader = false;
        this.error('Problemas ao trazer a lista de players, contate o administrador');
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
      // this.auto.clear();
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

  clear(e): void {
    e.stopPropagation();
    // this.auto.clear();
  }

  success(dataText: string) {
    return this.dialog.open(SucessComponent, { width: '40vw', data: dataText });
  }

  error(dataText: string) {
    return this.dialog.open(ErrorComponent, { width: '40vw', data: dataText });
  }


}
