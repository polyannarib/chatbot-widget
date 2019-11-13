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
    private spinner : NgxSpinnerService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    // if(this.authService.getUser() && localStorage.getItem('token') != null) {
    //   this.router.navigate(['/home/dashboard']);
    // }
  }
    
  login(){
    this.spinner.show('wait-login');
    this.authService.login(this.user);
    this.spinner.hide('wait-login');
  }

  onLogin() {
    if (this.form.valid) {
      
      // this.authService.login(this.user);
      this.authService.login(this.form.value).subscribe(
        (response) => {
          this.router.navigate(['/auth/login']);
        }, (error) => {
          console.log('deu problema');
        }
      );
    } else {
      
    }
  }

}

