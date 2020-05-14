import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProfileService } from 'src/app/core/services/profile.service';
import { CardService } from 'src/app/core/services/card.service';

@Component({
  selector: 'app-card-find',
  templateUrl: './card-find.component.html',
  styleUrls: ['./card-find.component.css']
})
export class CardFindComponent implements OnInit {

  loader: boolean = false;
  cardKnowledgeFilter: any;
  disabled: any;
  description: string;
  card: any;
  cardSelect

  mainStyle = this.profileService.getAppMainColor();

  constructor(
    public dialogRef: MatDialogRef<CardFindComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private profileService: ProfileService,
    private cardService: CardService
  ) { }

  ngOnInit() {
    this.search();
  }

  search() {
    this.cardKnowledgeFilter = [];
    this.cardService.searchComboCompetence().subscribe(
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
      this.card = event;
      this.disabled = false;
      this.description = event.description;
      return;
    }
    // debugger;
    if (this.cardKnowledgeFilter) {
      let auxListFilter = [];
      this.cardKnowledgeFilter.forEach((element, position) => {
        if (element.level <= event.type.level) {
          auxListFilter.push(element);
        }
      });
      this.cardKnowledgeFilter = auxListFilter;
    }
    this.getKnowledgeIn(event.knowledgeId);
  }

  getKnowledgeIn(ids?: any) {
    this.cardService.getCategory(ids).subscribe(
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

  confirmCard() {
    if(this.card) {
      this.dialogRef.close(this.card);
    }
  }

}
