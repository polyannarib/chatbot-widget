import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { company } from '../../../environments/environment'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pipe : DatePipe = new DatePipe('en-US'); 
  profile: boolean = false;
  currentPage: string = "COCKPIT"
  logoUrl: string = 'kyros_logo.png'

  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit() {
    if(company) {
      this.logoUrl = './assets/images/' + company + '_logo.png';
    }
  }

  getUserInfo(){
    let user = this.authService.getUser();
    if(user != undefined){
      return user.displayName;
    }
    return '';
  }

  // getDate(){
  //   let date = new Date();
  //   const myFormattedDate = this.pipe.transform(date, 'short');
  //   return myFormattedDate;
  // }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
