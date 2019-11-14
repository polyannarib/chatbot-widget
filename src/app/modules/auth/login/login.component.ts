import { User } from '../../../shared/models/UserModels';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private user: User = new User();
  form: FormGroup = this.formBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required]],
    type: ['WEBPORTAL']
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {}

  onLogin() {
    if (this.form.invalid) {
      alert('o formulário esta com problemas');
    }
    this.authService.login(this.form.value.email, btoa(this.form.value.password), this.form.value.type).subscribe(
      (response) => {
        this.router.navigate(['/auth/login']);
      }, (error) => {
        console.log('deu problema');
      }
    );
      
  }

}

