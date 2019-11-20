import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { MzToastService } from 'ngx-materialize';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

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
    private toastService: MzToastService,
    private http: HttpClient
  ) { }

  ngAfterViewInit() {
    if(this.authService.isAuthenticated()) {
      this.router.navigate(['/management/dashboard']);
    }
  }

  ngOnInit() {}

  onLogin() {
    if (this.form.valid) {
      this.form.value.password = btoa(this.form.value.password);
      this.http.post<any>(`${environment.back_end_url}/login`, this.form.value, { observe: 'response' })
        .subscribe(resp => {
          if (resp.body.status == 0) {
            const token = resp.headers.get('X-Token');
            localStorage.setItem('acessToken', token);
            this.router.navigate(['/management/dashboard']);
          } else {
            this.toastService.show('E-mail ou senha invalidos', 4000, 'toastrDanger');
          }
        })
    } else {
      this.toastService.show('Favor preencher todos campos!', 4000, 'toastrDanger');
    }
  }

}

