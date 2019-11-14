import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
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

  ngOnInit() {}

  onLogin() {
    if (this.form.valid) {
      this.authService.login(this.form.value.email, btoa(this.form.value.password), this.form.value.type);
      // .subscribe(
      //   (response) => {
      //     this.router.navigate(['/auth/login']);
      //   }, (error) => {
      //     this.toastService.show('Algum problema aconteceu', 4000, 'toastrDanger');
      //   }
      // ); 
    } else {
      this.toastService.show('Favor preencher todos campos!', 4000, 'toastrDanger');
    }
  }

}

