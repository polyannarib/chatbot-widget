import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, } from '@angular/forms';
import { PlayerService } from 'src/app/core/services/player.service';
import { CardService } from 'src/app/core/services/card.service';
import * as $ from 'jquery';
import { stringify } from 'querystring';
import { Observable } from 'rxjs';
import { MatSnackBar, MatBottomSheet } from '@angular/material';
import { NotifyComponent } from 'src/app/shared/components/notify/notify.component';

var slick: any;
@Component({
  selector: 'app-card-bind',
  templateUrl: './card-bind.component.html',
  styleUrls: ['./card-bind.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CardBindComponent implements OnInit {

  // refreshSlick: boolean = false;
  // title = 'tooltip';
  status: boolean = false;
  helpMessage: any = "Clique aqui para ver dicas sobre a tela";
  playerDeck: any;
  // filteredCard: any;
  characters: any;
  // cardDescription: any;
  // metricList: any;
  // listenerAdded: boolean = false;
  // visibleCardUpdated: boolean = true;
  // deckIdList: any;
  // isInDeck: boolean;
  // slickClass: any;
  // cardKnowledge: any;
  loader: boolean = false;
  cardNotFound: boolean = false;
  indexSlick: number = 0;
  
  // myControl = new FormControl();
  // myControl1 = new FormControl();
  // options: string[] = [];
  arrows: boolean = true;
  auxComp = [];
  cardKnowledgeFilter: any;
  parentIdsLevels: any;
  disabled: any;
  listKnowledge: any;
  // auxCat = []
  // auxAtt = []
  // auxCards = []
  // filteredOptions: Observable<string[]>;
  // competense = []
  // competenseType = []
  // category = []
  // attribute = []
  // flagComp: any
  // flagCat: any
  // flagAtt = []
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

  showDivAtt = 'display-hide'
  showDivComp = 'display-hide'
  id: any;
  loaderDeck: boolean = false;

  constructor(
    private playerService: PlayerService,
    private service: CardService,
    private _snackBar: MatSnackBar,
    private _bottomSheet: MatBottomSheet
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

  // resultInformation(value) {
  //   this.searchCards(value)
  // }

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
          console.log(this.characters);

          if (this.characters.cardName.indexOf("#") != -1) {
            this.characters.cardName = this.characters.cardName.replace("#", "sharp");
          }
          this.loader = false;
          return;
        }
        // this.cardNotFound = true;
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

  myDeck() {
    delete this.playerDeck;
    this.loaderDeck = true;
    this.service.listCardsByUser().subscribe(
      (response) => {
        if (response.status == 0) {

          console.log('Entrou dentro do player Deck');
          console.log(response.object);

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

  // updatePlayerDeck() {
  //   delete this.playerDeck;
  //   this.loaderDeck = true;
  //   this.service.listCardsByUser().subscribe(
  //     (response) => {
  //       if (response.status == 0) {
  //         this.playerDeck = response.object;
  //         var that = this;
  //         this.playerDeck.forEach(function (object) {
  //           if (object.cardName.indexOf("#") != -1) {
  //             object.cardName = object.cardName.replace("#", "sharp");
  //           }
  //           object.cardName.replace(' ', '');
  //         })
  //         this.deckIdList = [];
  //         this.playerDeck.forEach(function (card, index) {
  //           if (card.attributes.length == 0) {
  //             that.playerDeck.splice(index, 1);
  //           }
  //           card.attributes.forEach(function (character) {
  //             that.deckIdList.push('' + card.cardId + character.id);
  //           });
  //         });
  //         this.loaderDeck = false;
  //       }
  //     }, (err) => {
  //       console.log(err);
  //       this.loaderDeck = false;
  //     }
  //   )
  // }


  // updateVisibleCard() {
  //   this.visibleCardUpdated = false;
  //   var that = this;
  //   setTimeout(function() {
  //     if(that.characters && document.querySelector('.slick-current img')){
  //       var visibleCard = that.characters[document.querySelector('.slick-current img').id];
  //       var knowledge = visibleCard.attribute.classification.classificationDescription.split('.');
  //       var knowledgeTopics = [];
  //       knowledgeTopics.push(visibleCard.attribute.name[0].toUpperCase() + visibleCard.attribute.name.slice(1).toLowerCase());
  //       knowledge.forEach(function(object){
  //         if(object != ''){
  //           knowledgeTopics.push(object);
  //         }
  //       });
  //       var topics = knowledgeTopics;
  //       that.cardKnowledge = {topics};
  //       that.cardKnowledge = JSON.stringify(that.cardKnowledge);
  //       var description = that.filteredCard.cardDescription.split('.');
  //       var descriptionTopics = [];
  //       description.forEach(function(object){
  //         if(object != ''){
  //           descriptionTopics.push(object);
  //         }
  //       });
  //       topics = descriptionTopics;
  //       that.cardDescription = {topics};
  //       that.cardDescription = JSON.stringify(that.cardDescription);
  //       that.metricList = [];
  //       visibleCard.attribute.metricList.forEach(function(object){
  //         var metric = {};
  //         /* metric['title'] = object.metric.metricType.description; */
  //         metric['value'] = object.metric.value;
  //         var metricType;
  //         if(object.metric.metricType.description == 'Meses de experiência na área'){
  //           metric['title'] = 'Experiência';
  //         }
  //         else if(object.metric.metricType.description == 'Horas de projeto'){
  //           metric['title'] = 'Tempo de Projeto';
  //         }
  //         if(object.metric.metricType.metricType == 'MONTHS'){
  //           metricType = 'meses';
  //         }
  //         else if(object.metric.metricType.metricType == 'HOURS'){
  //           metricType = 'horas';
  //         }
  //         metric['description'] = "Maior que " + metric['value'] + " " + metricType;
  //         that.metricList.push(metric);
  //       });
  //       if(that.deckIdList != undefined)
  //         that.isInDeck = that.deckIdList.includes(''+that.filteredCard.cardId+visibleCard.id); 
  //       that.visibleCardUpdated = true;
  //     }
  //   }, 500);
  // }

  // addOrRemoveCard() {
  //   var data = {
  //     "knowledgeId": this.filteredCard.knowledge.knowledgeId,
  //     "attributeId": this.characters[document.querySelector('.slick-current img').id].id
  //   }
  //   if (this.isInDeck == false) {
  //     this.service.addCard(data).subscribe(
  //       (response) => {
  //         this.isInDeck = true;
  //         this.updatePlayerDeck();
  //       }, (err) => {
  //         console.log(err);
  //       }
  //     )
  //   }
  //   else {
  //     this.service.removeCard(data).subscribe(
  //       (response) => {
  //         this.isInDeck = false;
  //         this.updatePlayerDeck();
  //       }, (err) => {
  //         console.log(err);
  //       }
  //     )
  //   }
  // }


}
