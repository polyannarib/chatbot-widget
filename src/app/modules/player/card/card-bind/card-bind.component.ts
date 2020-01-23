import { Component, OnInit, ViewEncapsulation, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { PlayerService } from 'src/app/core/services/player.service';

var $: any;
@Component({
  selector: 'app-card-bind',
  templateUrl: './card-bind.component.html',
  styleUrls: ['./card-bind.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CardBindComponent implements OnInit {
  title = 'tooltip';
  status : boolean = false;
  helpMessage: any = "Clique aqui para ver dicas sobre a tela";
  playerDeck: any;

  
  arrows: boolean = true;
  slick = {
    lazyLoad: 'ondemand',
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  deck = {
    lazyLoad: 'ondemand',
    centerMode: true,
    centerPadding: '70px',
    dots: false,
    infinite: true,
    slidesToShow: 7,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  }

  constructor(
    private playerService: PlayerService
  ) { }

  ngOnInit() {
    this.updatePlayerDeck();
  }

  onShowTips(){
    this.status = !this.status;
    if(this.status == true){
      this.helpMessage = "Clique para sair do modo Dicas"
    }
    if(this.status == false){
      this.helpMessage = "Clique aqui para ver dicas sobre a tela";
    }
  }

  updatePlayerDeck() {
    this.playerService.findPlayerDeck().subscribe(
      (response) => {
        if (response.status == 0) {
          this.playerDeck = response.object;
          console.log(this.playerDeck);
        }
        console.log('Deu Ruim');
      }, (err) => {
        console.log(err);
      }
    )
  }

}
