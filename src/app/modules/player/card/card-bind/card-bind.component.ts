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
  refreshSlick: boolean = false;
  title = 'tooltip';
  status: boolean = false;
  helpMessage: any = "Clique aqui para ver dicas sobre a tela";
  playerDeck: any;
  filteredCard: any;
  characters: any;
  cardDescription: any;
  metricList: any;
  listenerAdded: boolean = false;
  visibleCardUpdated: boolean = true;
  deckIdList: any;
  isInDeck: boolean;
  slickClass: any;
  cardKnowledge: any;

  arrows: boolean = true;
  myControl = new FormControl();
  myControl1 = new FormControl();
  options: string[] = [];
  auxComp = []
  auxCat = []
  auxAtt = []
  auxCards = []
  filteredOptions: Observable<string[]>;
  competense = []
  competenseType = []
  category = []
  attribute = []
  flagComp: any
  flagCat: any
  flagAtt = []

  showDivAtt = 'display-hide'
  showDivComp = 'display-hide'
  id: any;

  constructor(
    private playerService: PlayerService,
    private service: CardService,
    private _snackBar: MatSnackBar,
    private _bottomSheet: MatBottomSheet
  ) { }

  ngOnInit() {
    this.metricList = [];
    this.updatePlayerDeck();

    this.service.searchComboCompetence().subscribe(response => {
      this.auxComp = response.object
      this.competenseType = response.object.map(res => {
        return res.name;
      })
    })

  }

  onChangeCategory(value) {
    this.showDivAtt = 'display-hide'
    this.showDivComp = 'display-hide'
    let aux = this.auxComp.filter((cur) => cur.name == value.value)
    this.flagComp = aux[0]
    this.id = aux[0].knowledgeId
    if (this.id != undefined) {
      this.service.getCategory(this.id).subscribe(response => {
        this.auxCat = response.object
        this.category = response.object.map(resp => {
          return resp.name
        })

      })
    }
  }

  onChangeAttribute(value) {
    this.showDivComp = 'display-hide'
    let aux = this.auxCat.filter((cur) => cur.name == value.value)
    this.flagCat = aux[0]
    let a = aux[0].knowledgeId
    if (a != undefined) {
      if (this.auxCat[0].hasChildren === "Y") {
        this.showDivAtt = 'display-show'
        this.service.getCategory(a).subscribe(response => {
          this.auxAtt = response.object
          this.attribute = response.object.map(resp => {
            return resp.name
          })
        })
      }
      if (this.auxCat[0].hasChildren === "N") {
        this.resultInformation(this.id)
      }
    }
  }

  onChangeCompetense(value) {
    let aux = this.auxAtt.filter((cur) => cur.name == value.value)
    this.id = aux[0].knowledgeId
    if (this.id != undefined) {
      if (this.auxAtt[0].hasChildren === "Y") {
        this.showDivComp = 'display-show'
        this.service.getCategory(this.id).subscribe(response => {
          this.auxCards = response.object
          this.competense = response.object.map(resp => {
            return resp.name
          })
        })
      }
      if (this.auxAtt[0].hasChildren === "N") {
        this.resultInformation(this.id)
      }
    }
  }

  onChangeCards(value) {
    let aux = this.auxCards.filter((cur) => cur.name == value.value)
    let a = aux[0].knowledgeId
    if (a != undefined) {
      this.searchCards(a)
    }
  }

  resultInformation(value) {
    this.searchCards(value)
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
    this.service.listCardsByUser().subscribe(
      (response) => {
        if (response.status == 0) {
          this.playerDeck = response.object;
          console.log(this.playerDeck);

          var that = this;
          this.playerDeck.forEach(function (object) {
            if (object.cardName.indexOf("#") != -1) {
              object.cardName = object.cardName.replace("#", "sharp");
            }
            object.cardName.replace(' ', '');
          })
          this.deckIdList = [];
          console.log(this.playerDeck);

          this.playerDeck.forEach(function (card, index) {
            if (card.attributes.length == 0) {
              that.playerDeck.splice(index, 1);
            }
            card.attributes.forEach(function (character) {
              that.deckIdList.push('' + card.cardId + character.id);
            });
          });
        }
      }, (err) => {
        console.log(err);
      }
    )
  }

  searchCards(id: any) {
    this.service.findCardById(id).subscribe(
      (response) => {
        if (response.status == 0) {
          this.filteredCard = response.object;
          this.characters = this.filteredCard.attributes;
          if (this.filteredCard.cardName.indexOf("#") != -1) {
            this.filteredCard.cardName = this.filteredCard.cardName.replace("#", "sharp");
          }
        }
        else {
          this._snackBar.openFromComponent(NotifyComponent,
            { data: { type: 'error', message: 'Por favor, digite os campos corretamente!' } });
          return;
        }
      }, (err) => {
      }
    )
  }

  updateVisibleCard() {
    this.visibleCardUpdated = false;
    if (this.characters && document.querySelector('.slick-current img')) {
      var visibleCard = this.characters[document.querySelector('.slick-current img').id];
      var that = this;

      var knowledge = visibleCard.attribute.classification.classificationDescription.split('.');
      var knowledgeTopics = [];
      knowledgeTopics.push(visibleCard.attribute.name[0].toUpperCase() + visibleCard.attribute.name.slice(1).toLowerCase());
      knowledge.forEach(function (object) {
        if (object != '') {
          knowledgeTopics.push(object);
        }
      });
      var topics = knowledgeTopics;
      this.cardKnowledge = { topics };
      this.cardKnowledge = JSON.stringify(this.cardKnowledge);

      var description = this.filteredCard.cardDescription.split('.');
      var descriptionTopics = [];
      descriptionTopics.push(visibleCard.name[0].toUpperCase() + visibleCard.name.slice(1).toLowerCase());
      description.forEach(function (object) {
        if (object != '') {
          descriptionTopics.push(object);
        }
      });

      topics = descriptionTopics;
      this.cardDescription = { topics };
      this.cardDescription = JSON.stringify(this.cardDescription);


      this.metricList = [];
      visibleCard.attribute.metricList.forEach(function (object) {
        var metric = {};
        /* metric['title'] = object.metric.metricType.description; */
        metric['title'] = 'Experiência';
        metric['value'] = object.metric.value;

        var metricType;
        if (object.metric.metricType.metricType == 'MONTHS') {
          metricType = 'meses';
        }
        metric['description'] = "Maior que " + metric['value'] + " " + metricType;
        that.metricList.push(metric);
      });

      if (this.deckIdList != undefined)
        this.isInDeck = this.deckIdList.includes('' + this.filteredCard.cardId + visibleCard.id);

      this.visibleCardUpdated = true;
    }
  }

  addOrRemoveCard() {
    var data = {
      "knowledgeId": this.filteredCard.knowledge.knowledgeId,
      "attributeId": this.characters[document.querySelector('.slick-current img').id].id
    }

    if (this.isInDeck == false) {
      this.service.addCard(data).subscribe(
        (response) => {
          console.log(response);
          this.isInDeck = true;
          this.updatePlayerDeck();
          this.refreshSlick = !this.refreshSlick;
        }, (err) => {
          console.log(err);
        }
      )
    }
    else {
      this.service.removeCard(data).subscribe(
        (response) => {
          console.log(response);
          this.isInDeck = false;
          this.updatePlayerDeck();
          this.refreshSlick = !this.refreshSlick;
        }, (err) => {
          console.log(err);
        }
      )
    }
  }


}
