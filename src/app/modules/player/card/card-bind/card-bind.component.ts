import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, } from '@angular/forms';
import { PlayerService } from 'src/app/core/services/player.service';
import { CardService } from 'src/app/core/services/card.service';
import { MatSnackBar, MatBottomSheet } from '@angular/material';
import { NotifyComponent } from 'src/app/shared/components/notify/notify.component';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-card-bind',
  templateUrl: './card-bind.component.html',
  styleUrls: ['./card-bind.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CardBindComponent implements OnInit {

  mainStyle = this.profileService.getAppMainColor();

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
  myCards = [];
  description: string;
  loaderDeck: boolean = false;

  constructor(
    private service: CardService,
    private _snackBar: MatSnackBar,
    private httpClient: HttpClient,
    private profileService: ProfileService
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
        // console.log('deu ruim');
      }, (err) => {
        // console.log('deu ruim');
    })
  }

  FindParente(event, resource) {
    // debugger;
    if (resource.level === 4) {
      this.disabled = false;
      this.searchCards(event.knowledgeId);
      this.description = event.description;
      return;
    }
    // debugger;
    if (this.cardKnowledgeFilter) {
      let auxListFilter = [];
      this.cardKnowledgeFilter.forEach((element, position) => {
        // if (element.level > event.type.level) {
        //   var index = this.cardKnowledgeFilter.indexOf(position);
        //   this.cardKnowledgeFilter.splice(position, 1);
        // }
        if (element.level <= event.type.level) {
          auxListFilter.push(element);
        }
      });
      this.cardKnowledgeFilter = auxListFilter;
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
        // console.log('Deu ruim');
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

  myDeck() {
    delete this.playerDeck;
    this.loaderDeck = true;
    this.service.myDeck().subscribe(
      (response) => {
        if (response.status == 0) {
          response.object.forEach((element) => {
            let idAtributes;
            element.classification.attributes.forEach((res) => {
              if(res.attribute.manualDefiner == true) {
                idAtributes = res.id;
              }
            });
            if(idAtributes) {
              this.myCards.push(idAtributes);
            }
          });
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

  addCard(attributes) {
    let idAtributes; 
    attributes.forEach((res) => {
      if(res.attribute.manualDefiner == true) {
        idAtributes = res.id;
      }
    });
    if(this.myCards.includes(idAtributes)) {
      this._snackBar.openFromComponent(NotifyComponent, 
        { data: { type: 'success', message: 'Você já possui essa carta!' }});
      return;
    }
    // var data = {
    //   "knowledgeId": knowledgeId,
    //   "attributeId": attributesId
    // }
    attributes.forEach(element => {
      if(element.attribute.manualDefiner == true) {
        this.service.addCard(element.id).subscribe(
          (response) => {
            if(response.status == 0) {
              this.playerDeck.push(response.object);
              this._snackBar.openFromComponent(NotifyComponent, 
                { data: { type: 'success', message: 'Carta adicionada com sucesso!' }});
              return;
            }
            this._snackBar.openFromComponent(NotifyComponent, 
              { data: { type: 'error', message: 'Você já possui essa carta' }});
          }, (err) => {
            this._snackBar.openFromComponent(NotifyComponent, 
              { data: { type: 'error', message: 'Problemas ao cadastrar a carta ao deck, contate o adminstrador' }});
          }
        )
      }
    });
  }

  removeCard(atributtes) {
    atributtes.forEach((element, index) => {
      if(element.attribute.manualDefiner == true) {
        this.service.removeCard(element.id).subscribe(
          (response) => {
            if(response.status == 0) {
              this.playerDeck.splice(index, 1);
              this._snackBar.openFromComponent(NotifyComponent, 
                { data: { type: 'success', message: 'Carta removida com sucesso!' }});
              return;
            }
            this._snackBar.openFromComponent(NotifyComponent, 
              { data: { type: 'error', message: 'Essa carta não pode ser removida' }});
          }, (err) => {
            this._snackBar.openFromComponent(NotifyComponent, 
              { data: { type: 'error', message: 'Problemas ao remover a carta ao deck, contate o adminstrador' }});
          }
        )
      }
    });
  }

  getDisabled(attribute) {
    if(attribute.length == 0) {
      return true;
    } else {
      let lenghtArray = attribute.map(element => {
        return element.attribute.manualDefiner == true;
      }).length;
      if(lenghtArray > 0) {
        return false;
      }
      return true;
    }
  }

  showErrorMessageAttributes(atributtes) {
    if(atributtes.length == 0) {
      return false;
    } else {
      const id = atributtes.map(element => {
        if(element.attribute.manualDefiner == false) {
          return element.id
        }
      });
      if(id.length > 0) {
        return true;
      }
      return false;
    }
  }

}
