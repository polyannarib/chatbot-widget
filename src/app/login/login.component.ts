import { User } from './user';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private user: User = new User();

  constructor(
    private authService: AuthService,
    private spinner : NgxSpinnerService,
    private router: Router) { }

  ngOnInit() {
    if( this.authService.getUser != undefined ){

      this.router.navigate(['/dashboard']);
    }
  }

  fazerLogin(){
    this.spinner.show('wait-login')
    this.authService.fazerLogin(this.user);
    this.spinner.hide('wait-login');
  }

}

