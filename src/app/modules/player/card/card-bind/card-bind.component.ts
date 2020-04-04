import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, } from '@angular/forms';
import { PlayerService } from 'src/app/core/services/player.service';
import { CardService } from 'src/app/core/services/card.service';
import { MatSnackBar, MatBottomSheet } from '@angular/material';
import { NotifyComponent } from 'src/app/shared/components/notify/notify.component';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-card-bind',
  templateUrl: './card-bind.component.html',
  styleUrls: ['./card-bind.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CardBindComponent implements OnInit {

  status: boolean = false;
  helpMessage: any = "Clique aqui para ver dicas sobre a tela";
  playerDeck: any;
  characters: any;
  loader: boolean = false;
  cardNotFound: boolean = false;
  indexSlick: number = 0;
  arrows: boolean = true;
  auxComp = [];
  cardKnowledgeFilter: any;
  parentIdsLevels: any;
  disabled: any;
  listKnowledge: any;
  slick = {
    lazyLoad: 'ondemand',
    dots: false,
    infinite: false,
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
    centerMode: true,
    lazyLoad: 'progressive',
    centerPadding: '70px',
    dots: false,
    infinite: true,
    slidesToShow: 7,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 4,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 3,
          slidesToScroll: 1
        }
      }
    ]
  }

  showDivAtt = 'display-hide'
  showDivComp = 'display-hide'
  id: any;
  loaderDeck: boolean = false;

  constructor(
    private service: CardService,
    private _snackBar: MatSnackBar,
    private httpClient: HttpClient
  ) { }

  ngOnInit() {
    this.search();
    this.myDeck();
  }
  
  search() {
    this.cardKnowledgeFilter = [];
    this.service.searchComboCompetence().subscribe(
      (response) => {
        if(response.status == 0) {
          this.cardKnowledgeFilter.push({
            'level': response.object[0].type.level,
            'knowledgeList': response.object
          })
          return;
        }
        console.log('deu ruim');
      }, (err) => {
        console.log('deu ruim');
    })
  }

  FindParente(event, resource) {
    if(resource.level === 4) {
      this.disabled = false;
      this.searchCards(event.knowledgeId);
      return;
    }
    if(this.cardKnowledgeFilter) {
      this.cardKnowledgeFilter.forEach((element, position) => {
        if(element.level > event.type.level) {
          var index = this.cardKnowledgeFilter.indexOf(position);
          this.cardKnowledgeFilter.splice(index, 1);
        }
      });
    }
    this.getKnowledgeIn(event.knowledgeId);
  }

  getKnowledgeIn(ids?: any) {
    this.service.getCategory(ids).subscribe(
      (response) => {
        if(response.status == 0) {
          this.cardKnowledgeFilter.push({
            'level': response.object[0].type.level,
            'knowledgeList': response.object
          })
          return;
        }
      }, (err) => {
        console.log('Deu ruim');
    })
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

  searchCards(id: any) {
    this.loader = true;
    // this.cardNotFound = false;
    delete this.characters;
    this.service.findCardById(id).subscribe(
      (response) => {
        if (response.status == 0) {
          this.characters = response.object;
          // if (this.characters.cardName.indexOf("#") != -1) {
          //   this.characters.cardName = this.characters.cardName.replace("#", "sharp");
          // }
          this.loader = false;
          return;
        }
        this.loader = false;
      }, (err) => {
        this.loader = false;
      }
    )
  }

  getStar(card) {
    var url = 'https://www.kyros.com.br/portal-webplayer-images/Estrelas/estrela';
    url += card.attribute.name[0].toUpperCase();
    url += card.attribute.name.slice(1).toLowerCase();
    url += '.png';
    return url;
  }
  
  getCard(card, index) {
    if(!card.url || card.attributes.length == 0 || !card.attributes[index].attribute) {
      return null;
    }
    var url = card.url;
    url += 'persona';
    url += card.attributes[index].attribute.name[0].toUpperCase();
    url += card.attributes[index].attribute.name.slice(1).toLowerCase();
    url += '.png';
    return url;
  }

  getCardDeck(card) {
    var url = card.url;
    url += 'persona';
    url += card.attributes[0].attribute.name[0].toUpperCase();
    url += card.attributes[0].attribute.name.slice(1).toLowerCase();
    url += '.png';
    return url;
  }

  getLogo(card, index) {
    var cardName = card.cardName.toLowerCase();
    var url = card.url;
    if (cardName.indexOf("#") != -1) {
      cardName = cardName.replace("#", "sharp");
    }
    cardName.replace(' ', '');
    url += cardName;
    url += '.png';
    return url;
  }

  myDeck() {
    delete this.playerDeck;
    this.loaderDeck = true;
    this.service.myDeck().subscribe(
      (response) => {
        if (response.status == 0) {
          this.playerDeck = response.object;
          this.loaderDeck = false;
          return;
        }
        this.loaderDeck = false;
      }, (err) => {
        this.loaderDeck = false;
    })
  }

  classSlick(event) {
    event.on('afterChange', (event, slick, currentSlide, nextSlide) => { 
      this.indexSlick = currentSlide;
    });
  }

  addOrRemoveCard(knowledgeId, attributesId) {
    var data = {
      "knowledgeId": knowledgeId,
      "attributeId": attributesId
    }
    this.service.addCard(data).subscribe(
      (response) => {
        if(response.status == 0) {
          this.myDeck();
          this._snackBar.openFromComponent(NotifyComponent, 
            { data: { type: 'success', message: 'Carta adicionada com sucesso!' }});
          return;
        }
        this._snackBar.openFromComponent(NotifyComponent, 
          { data: { type: 'error', message: 'Você já possui essa carta' }});
        console.log('problemas');
      }, (err) => {
        this._snackBar.openFromComponent(NotifyComponent, 
          { data: { type: 'error', message: 'Problemas ao cadastrar a carta ao deck, contate o adminstrador' }});
        console.log(err);
      }
    )
  }

  // getImg(url) {
    // console.log(this.service.getPhotoImg(url));
    // console.log(url);
    // this.service.getPhotoImg(url).subscribe(
    //   (response) => {
    //     console.log('----- Entrou dentro do getImg -----');
    //     console.log(response);
    //     return response;
    // });
    // return this.service.getPhotoImg(url);
    // console.log(url)
    // console.log(this.httpClient.get(url))
    // return this.httpClient.get(url, { responseType: 'blob' }).pipe(map(e => URL.createObjectURL(e)));
  // }

}
