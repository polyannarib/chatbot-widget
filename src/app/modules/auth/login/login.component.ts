import { User } from '../../../shared/models/UserModels';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private user: User = new User();

  constructor(
    private authService: AuthService,
    private spinner : NgxSpinnerService,
    private router: Router
  ) { }

  ngOnInit() {
    if(this.authService.getUser() && localStorage.getItem('token') != null) {
      this.router.navigate(['/home/dashboard']);
    }
  }

  login(){
    this.spinner.show('wait-login');
    this.authService.login(this.user);
    this.spinner.hide('wait-login');
  }

}

