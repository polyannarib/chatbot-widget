import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/user';

import { MatSnackBar } from '@angular/material/snack-bar';
import { NotifyComponent } from 'src/app/shared/components/notify/notify.component';
import { MatBottomSheet } from '@angular/material';
import { CompanySelectComponent } from '../company-select/company-select.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

  loader: boolean = false;

  user: User;
  form: FormGroup = this.formBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required]],
    type: ['WEBPORTAL']
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _bottomSheet: MatBottomSheet
  ) { }

  ngAfterViewInit() {
    if(this.authService.isAuthenticated()) {
      this.router.navigate(['/management/dashboard']);
    }
  }

  ngOnInit() { }

  onLogin() {
    this.loader = true;
    if (this.form.valid) {
      this.form.value.password = btoa(this.form.value.password);
      this.authService.login(this.form.value).subscribe(
        (response) => {
          if (response.status == 0) {
            this.authService.setToken(response.object.token);
            return;
          } if (response.status == 1) {
            this.loader = false;
            this._snackBar.openFromComponent(NotifyComponent, 
              { data: { type: 'error', message: 'Por favor, digite os campos corretamente!' }});
            return;
          } if (response.status == 2) {
            this.loader = false;
            this._bottomSheet.open(CompanySelectComponent, 
              { data: {
                form: this.form.value,
                companys: response.object
              }});
            return;
          }
        }, (err) => {
          this.loader = false;
          this._snackBar.openFromComponent(NotifyComponent, 
            { data: { type: 'error', message: 'Problemas ao fazer o login, favor tentar novamente!' }});
      })
    } else {
      this.loader = false;
      this._snackBar.openFromComponent(NotifyComponent, 
        { data: { type: 'error', message: 'Por favor, digite os campos corretamente!' }});
    }
  }

}
