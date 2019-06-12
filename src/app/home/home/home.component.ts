import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pipe : DatePipe = new DatePipe('en-US'); 
  
  constructor(private authService:AuthService) { }

  ngOnInit() {
  }

  getUserInfo(){
    let user = this.authService.getUser();
    if(user != undefined){
      return user.companyName + '\n' + user.displayName;
    }
    return '';
  }

  getDate(){
    let date = new Date();
    const myFormattedDate = this.pipe.transform(date, 'short');
    return myFormattedDate;
  }
}
