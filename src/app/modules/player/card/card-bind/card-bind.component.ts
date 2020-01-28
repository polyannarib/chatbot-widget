import { Component, OnInit, ViewEncapsulation, ElementRef, DoCheck, AfterViewChecked } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { PlayerService } from 'src/app/core/services/player.service';
import { CardService } from 'src/app/core/services/card.service';
import * as $ from 'jquery';
import { stringify } from 'querystring';

var slick: any;
@Component({
  selector: 'app-card-bind',
  templateUrl: './card-bind.component.html',
  styleUrls: ['./card-bind.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CardBindComponent implements OnInit, AfterViewChecked {
  refreshSlick: boolean = false;
  title = 'tooltip';
  status : boolean = false;
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
    private playerService: PlayerService,
    private cardService: CardService
  ) { }

  ngOnInit() {
    this.updatePlayerDeck();
    this.searchCards();
    this.metricList = [];
  }

  ngAfterViewChecked(){
    
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
    this.cardService.listCardsByUser().subscribe(
      (response) => {
        if (response.status == 0) {
          this.playerDeck = response.object;
          console.log(this.playerDeck);

          var that = this;
          this.playerDeck.forEach(function(object){
            if(object.cardName.indexOf("#") != -1){
              object.cardName = object.cardName.replace("#", "sharp");
            }
          })
          this.deckIdList = [];
        
          this.playerDeck.forEach(function(card){
            card.attributes.forEach(function(character){
              that.deckIdList.push(''+card.cardId+character.attribute.id);
            });
          });
        }
      }, (err) => {
        console.log(err);
      }
    )
  }

  searchCards(){
    this.cardService.findCardById(23).subscribe(
      (response) => {
        if (response.status == 0) {
          this.filteredCard = response.object;
          this.characters = this.filteredCard.attributes;
          if(this.filteredCard.cardName.indexOf("#") != -1){
            this.filteredCard.cardName = this.filteredCard.cardName.replace("#", "sharp");
          }

          
        }
      }, (err) => {
        console.log(err);
      }
    )
  }

  updateVisibleCard(){
    this.visibleCardUpdated = false;
    if(this.characters && document.querySelector('.slick-current img')){
      var visibleCard = this.characters[document.querySelector('.slick-current img').id].attribute;
      var that = this;

      var description = visibleCard.classification.classificationDescription.split('.');
      var descriptionTopics = [];
      descriptionTopics.push(visibleCard.name[0].toUpperCase() + visibleCard.name.slice(1).toLowerCase());
      description.forEach(function(object){
        if(object != ''){
          descriptionTopics.push(object);
        }
      });
      this.cardDescription = {descriptionTopics};
      this.cardDescription = JSON.stringify(this.cardDescription);
      console.log(this.cardDescription);

      this.metricList = [];
      visibleCard.metricList.forEach(function(object){
        var metric = {};
        /* metric['title'] = object.metric.metricType.description; */
        metric['title'] = 'Experiência';
        metric['value'] = object.metric.value;

        var metricType;
        if(object.metric.metricType.metricType == 'MONTHS'){
          metricType = 'meses';
        }
        metric['description'] = "Maior que " + metric['value'] + " " + metricType;
        that.metricList.push(metric);
      });

      if(this.deckIdList != undefined)
        this.isInDeck = this.deckIdList.includes(''+this.filteredCard.cardId+visibleCard.id); 

      this.visibleCardUpdated = true;
    }
  }

  addOrRemoveCard(){
    var data = {
      "knowledgeId": this.filteredCard.knowledge.knowledgeId,
      "attributeId": this.characters[document.querySelector('.slick-current img').id].attribute.id
    }

    if(this.isInDeck == false){
      this.cardService.addCard(data).subscribe(
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
    else{
      this.cardService.removeCard(data).subscribe(
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
