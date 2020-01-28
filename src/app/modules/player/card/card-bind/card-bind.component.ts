import { Component, OnInit, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { PlayerService } from 'src/app/core/services/player.service';
import { CardService } from 'src/app/core/services/card.service';
import { Observable, Subject, merge } from 'rxjs';

declare var $: any


@Component({
  selector: 'app-card-bind',
  templateUrl: './card-bind.component.html',
  styleUrls: ['./card-bind.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CardBindComponent implements OnInit {

  title = 'tooltip';
  status: boolean = false;
  helpMessage: any = "Clique aqui para ver dicas sobre a tela";
  playerDeck: any;

  arrows: boolean = true;
  myControl = new FormControl();
  myControl1 = new FormControl();
  options: string[] = [];
  auxComp = []
  auxCat = []
  auxAtt = []
  filteredOptions: Observable<string[]>;
  competense = []
  competenseType = []
  category = []
  attribute = []

  constructor(
    private playerService: PlayerService,
    private service: CardService
  ) { }

  ngOnInit() {

    this.updatePlayerDeck();

    this.service.searchComboCompetence().subscribe(response => {
      this.auxComp = response.object
      this.competenseType = response.object.map(res => {
        return res.name;
      })
    })

  }
  
  onChangeCategory(value) {
    let aux = this.auxComp.filter((cur) => cur.name == value.value)
    let a = aux[0].knowledgeId
    if (a != undefined) {
      this.service.getCategory(a).subscribe(response => {
        this.auxCat = response.object
        this.category = response.object.map( resp => {
          return resp.name
        })

      })
    }
  }

  onChangeAttribute(value) {
    let aux = this.auxCat.filter((cur) => cur.name == value.value)
    let a = aux[0].knowledgeId
    if (a != undefined) {
      this.service.getCategory(a).subscribe(response => {
        this.auxAtt = response.object
        this.attribute = response.object.map( resp => {
          return resp.name
        })

      })
    }
  }

  onChangeCompetense(value) {
    debugger
    let aux = this.auxAtt.filter((cur) => cur.name == value.value)
    let a = aux[0].knowledgeId
    if (a != undefined) {
      this.service.getCategory(a).subscribe(response => {
        this.competense = response.object.map( resp => {
          return resp.name
        })

      })
    }
  }


  onShowTips() {
    this.status = !this.status;
    if (this.status == true) {
      this.helpMessage = "Clique para sair do modo Dicas"
    }
    if (this.status == false) {
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
}
