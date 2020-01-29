import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, } from '@angular/forms';
import { PlayerService } from 'src/app/core/services/player.service';
import { CardService } from 'src/app/core/services/card.service';
import * as $ from 'jquery';
import { stringify } from 'querystring';
import { Observable } from 'rxjs';

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
  cardKnowledge: any;
  loader: boolean = false;
  cardNotFound: boolean = false;

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
  flagComp:any
  flagCat:any
  flagAtt = []

  showDivAtt = 'display-hide'
  showDivComp = 'display-hide'
  id: any;
  loaderDeck: boolean = false;

  constructor(
    private playerService: PlayerService,
    private service: CardService
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
    let aux = this.auxCat.filter((cur) => cur.name == value.value)
    this.flagCat = aux[0]
    let a = aux[0].knowledgeId
    if (a != undefined) {
      if (this.flagComp.hasChildren === "Y") {
        this.showDivAtt = 'display-show'
      } 
      if (this.flagComp.hasChildren === "N") {
        this.showDivAtt = 'display-hide'
      } 
      this.service.getCategory(a).subscribe(response => {
        this.auxAtt = response.object
        this.attribute = response.object.map(resp => {
          return resp.name
        })

      })
    }
  }

  onChangeCompetense(value) {
    let aux = this.auxAtt.filter((cur) => cur.name == value.value)
    this.id = aux[0].knowledgeId
    if (this.id != undefined) {
      if (this.flagCat.hasChildren === "Y") {
        this.showDivComp = 'display-show'
      }
      if (this.flagCat.hasChildren === "N") {
        this.showDivComp = 'display-hide'
      } 
      this.service.getCategory(this.id).subscribe(response => {
        this.auxCards = response.object
        this.competense = response.object.map(resp => {
          return resp.name
        })

      })
    }
  }

  onChangeCards(value) {
    let aux = this.auxCards.filter((cur) => cur.name == value.value)
    let a = aux[0].knowledgeId
    if (a != undefined) {
      this.searchCards(a)
    }
  }

  resultInformation(){
    this.searchCards(this.id)
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
    delete this.playerDeck;
    this.loaderDeck = true;
    this.service.listCardsByUser().subscribe(
      (response) => {
        if (response.status == 0) {
          this.playerDeck = response.object;

          var that = this;
          this.playerDeck.forEach(function(object){
            if(object.cardName.indexOf("#") != -1){
              object.cardName = object.cardName.replace("#", "sharp");
            }
            object.cardName.replace(' ', '');
          })
          this.deckIdList = [];
        
          this.playerDeck.forEach(function(card, index){
            if(card.attributes.length == 0){
              that.playerDeck.splice(index, 1);
            }
            card.attributes.forEach(function(character){
              that.deckIdList.push(''+card.cardId+character.id);
            });
          });
          this.loaderDeck = false;
        }
      }, (err) => {
        console.log(err);
        this.loaderDeck = false;
      }
    )
    
  }

  searchCards(id) {
    this.loader = true;
    delete this.characters;
    this.service.findCardById(id).subscribe(
      (response) => {
        if (response.status == 0 && response.object != null) {
          //$('.characters #slick .slick-slide').remove();
          this.refreshSlick = !this.refreshSlick;
          this.filteredCard = response.object;
          this.characters = this.filteredCard.attributes;
          if(this.filteredCard.cardName.indexOf("#") != -1){
            this.filteredCard.cardName = this.filteredCard.cardName.replace("#", "sharp");
          }
          this.cardNotFound = false;
          this.loader = false;
        }
        else{
          this.cardNotFound = true;
        }
        this.loader = false;
      }, (err) => {
        console.log(err);
        this.loader = false;
      }
    )
  }

  updateVisibleCard(){
    this.visibleCardUpdated = false;
    var that = this;
    setTimeout(function(){
      if(that.characters && document.querySelector('.slick-current img')){
        
        var visibleCard = that.characters[document.querySelector('.slick-current img').id];
        var knowledge = visibleCard.attribute.classification.classificationDescription.split('.');
        var knowledgeTopics = [];
        knowledgeTopics.push(visibleCard.attribute.name[0].toUpperCase() + visibleCard.attribute.name.slice(1).toLowerCase());
        knowledge.forEach(function(object){
          if(object != ''){
            knowledgeTopics.push(object);
          }
        });
        var topics = knowledgeTopics;
        that.cardKnowledge = {topics};
        that.cardKnowledge = JSON.stringify(that.cardKnowledge);
  
        var description = that.filteredCard.cardDescription.split('.');
        var descriptionTopics = [];

        description.forEach(function(object){
          if(object != ''){
            descriptionTopics.push(object);
          }
        });
  
        topics = descriptionTopics;
        that.cardDescription = {topics};
        that.cardDescription = JSON.stringify(that.cardDescription);
        
  
        that.metricList = [];
        visibleCard.attribute.metricList.forEach(function(object){
          var metric = {};
          /* metric['title'] = object.metric.metricType.description; */
          metric['value'] = object.metric.value;
  
          var metricType;
          if(object.metric.metricType.description == 'Meses de experiência na área'){
            metric['title'] = 'Experiência';
          }
          else if(object.metric.metricType.description == 'Horas de projeto'){
            metric['title'] = 'Tempo de Projeto';
          }
          if(object.metric.metricType.metricType == 'MONTHS'){
            metricType = 'meses';
          }
          else if(object.metric.metricType.metricType == 'HOURS'){
            metricType = 'horas';
          }
          metric['description'] = "Maior que " + metric['value'] + " " + metricType;
          that.metricList.push(metric);
        });
  
        if(that.deckIdList != undefined)
          that.isInDeck = that.deckIdList.includes(''+that.filteredCard.cardId+visibleCard.id); 
  
        that.visibleCardUpdated = true;
      }
    }, 500);
    
  }

  addOrRemoveCard(){
    var data = {
      "knowledgeId": this.filteredCard.knowledge.knowledgeId,
      "attributeId": this.characters[document.querySelector('.slick-current img').id].id
    }

    if(this.isInDeck == false){
      this.service.addCard(data).subscribe(
        (response) => {
          this.isInDeck = true;
          this.updatePlayerDeck();
        }, (err) => {
          console.log(err);
        }
      )
    }
    else{
      this.service.removeCard(data).subscribe(
        (response) => {

          this.isInDeck = false;
          this.updatePlayerDeck();
        }, (err) => {
          console.log(err);
        }
      )
    }
  }


}
