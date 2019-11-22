import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/user';

import { MzToastService } from 'ngx-materialize';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

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
    private toastService: MzToastService
  ) { }

  // ngAfterViewInit() {
  //   if(this.authService.isAuthenticated()) {
  //     this.router.navigate(['/management/dashboard']);
  //   }
  // }

  ngOnInit() { }

  onLogin() {
    if (this.form.valid) {
      this.form.value.password = btoa(this.form.value.password);
      this.authService.login(this.form.value).subscribe(
        (response) => {
          switch (response.status) {
            case 0:
              localStorage.setItem('acessToken', response.object.token);
              this.router.navigate(['/management/dashboard']);
              break;
            case 1:
              this.toastService.show(response.object.message, 4000, 'toastrDanger');
              break;
            default:
              this.toastService.show('Ops, ocorreu algum erro. Contate o administrador', 4000, 'toastrDanger');
              break;
          }
        }, (err) => {
          console.log(err);
          this.toastService.show('E-mail ou senha invalidos', 4000, 'toastrDanger');
      })
    } else {
      this.toastService.show('Favor preencher todos campos!', 4000, 'toastrDanger');
    }
  }

}

