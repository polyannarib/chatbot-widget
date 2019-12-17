import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CardService } from 'src/app/core/services/card.service';
import { MatDialog } from '@angular/material';
import { ErrorComponent } from 'src/app/shared/components/modal/error/error.component';
import { SucessComponent } from 'src/app/shared/components/modal/sucess/sucess.component';

@Component({
  selector: 'app-card-create',
  templateUrl: './card-create.component.html',
  styleUrls: ['./card-create.component.css']
})
export class CardCreateComponent implements OnInit {

  loader: boolean = false;
  form: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    skillId: ['', Validators.required]
  });
  skills: any;
  card: any;

  constructor(
    private formBuilder: FormBuilder,
    private cardService: CardService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.findSkills();
  }

  findSkills() {
    this.loader = true;
    this.cardService.findAllTasks().subscribe(
      (response) => {
        this.skills = response.object;
        this.loader = false;
      }, (err) => {
        this.loader = false;
      }
    )
  }

  onSubmit() {
    this.loader = true;
    if(this.form.valid) {
      console.warn(this.form.value);
      this.cardService.createCard(this.form.value).subscribe(
        (response) => {
          if(response.status == 0) {
            this.card = response.object;
            this.loader = false;
            this.success('Carta criada com sucesso');
            return;
          }
          this.error('Problemas ao criar a carta');
        }, (err) => {
          this.loader = false;
          this.error('Problemas ao criar a carta');
        }
      )
    } else {
      this.loader = true;
      this.error('Formulário preenchido incorretamente');
    }
  }

  success(dataText: string) {
    return this.dialog.open(SucessComponent, { width: '40vw', data: dataText });
  }

  error(dataText: string) {
    return this.dialog.open(ErrorComponent, { width: '40vw', data: dataText });
  }

}
