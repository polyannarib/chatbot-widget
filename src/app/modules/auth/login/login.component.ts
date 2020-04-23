import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/user';
import { AppConstants } from '../../../app.constants';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotifyComponent } from 'src/app/shared/components/notify/notify.component';
import { MatBottomSheet } from '@angular/material';
import { CompanySelectComponent } from '../company-select/company-select.component';
import { ProfileService } from 'src/app/core/services/profile.service';

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
    private _bottomSheet: MatBottomSheet,
    private profileService: ProfileService
  ) { }

  ngAfterViewInit() {
    if(this.authService.isAuthenticated()) {
      this.router.navigate(['/management']);
    }
  }

  ngOnInit() { 
    // console.log('------ Entrou dentro do response onLogin()');
  }

  onLogin() {
    this.loader = true;
    if (this.form.valid) {
      this.form.value.password = btoa(this.form.value.password);
      this.authService.login(this.form.value).subscribe(
        (response) => {
          if (response.status == 0) {
            this.authService.setAppToken(response.object.appToken);
            this.authService.setSSOID(response.object.ssoId);

            // --- GET WHITELABEL
            this.profileService.getWhiteLabel().subscribe(
              (response) => {
              if (response.status == 0) {
                  this.profileService.setWhiteLabel(response.object);

                    let scopes = this.authService.getScopes();

                    window.location.href = AppConstants.URL_SSO + '/cookie' 
                    + '?SSOID=' + response.object.ssoId
                    + '&urlRedirect=' + AppConstants.WORKPLAYER_HOME + `/${this.authService.redirectPageByScopes()}`;
              }
                this._snackBar.openFromComponent(NotifyComponent, 
                  { data: { type: 'error', message: 'Problemas ao fazer o login, favor tentar novamente!' }});
                return;
              }, (err) => {
                this._snackBar.openFromComponent(NotifyComponent, 
                  { data: { type: 'error', message: 'Problemas ao fazer o login, favor tentar novamente!' }});
                return;
            })

            // this.getProfile();
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

  // redirectByScopes(): string {
  //   let scopes = this.authService.getScopes();
  //   if(scopes.includes('wpplayer')) {
  //     return 'player'
  //   }
  //   if(scopes.includes('wpleader')) {
  //     return 'management'
  //   }
  // }

  // getProfile() {
  //   this.profileService.getWhiteLabel().subscribe(
  //       (response) => {
  //       if (response.status == 0) {
  //           this.profileService.setWhiteLabel(response.object);
  //           return;
  //       }
  //       return;
  //       }, (err) => {
  //       return;
  //   })
  // }

}
