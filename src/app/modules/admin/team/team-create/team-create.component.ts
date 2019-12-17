import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TeamService } from 'src/app/core/services/team.service';
import { MatDialog } from '@angular/material';
import { SucessComponent } from 'src/app/shared/components/modal/sucess/sucess.component';
import { ErrorComponent } from 'src/app/shared/components/modal/error/error.component';

@Component({
  selector: 'app-team-create',
  templateUrl: './team-create.component.html',
  styleUrls: ['./team-create.component.css']
})
export class TeamCreateComponent implements OnInit {

  loader: boolean = false;
  form: FormGroup = this.formBuilder.group({
    name: ['', Validators.required]
  });
  team: any;

  constructor(
    private formBuilder: FormBuilder,
    private teamService: TeamService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.loader = true;
    if (this.form.valid) {
      this.teamService.save(this.form.value).subscribe(
        (response) => {
          if(response.status == 0) {
            this.team = response.object;
            this.loader = false;
            this.success('Equipe criada com sucesso!');
            return;
          }
          this.loader = false;
          this.error('Problemas ao criar a equipe');
        }, (err) => {
          this.error('Problemas ao criar a equipe');
          this.loader = false;
        }
      )
    } else {
      this.error('Formulário preenchido incorretamente');
      this.loader = false;
    }
  }

  success(dataText: string) {
    return this.dialog.open(SucessComponent, { width: '40vw', data: dataText });
  }

  error(dataText: string) {
    return this.dialog.open(ErrorComponent, { width: '40vw', data: dataText });
  }

}
