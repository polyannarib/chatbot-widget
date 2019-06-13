import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pipe : DatePipe = new DatePipe('en-US'); 
  profile: boolean = false;

  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit() {
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
