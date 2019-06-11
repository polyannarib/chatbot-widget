import { AuthService } from './login/auth.service';
import { Component } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet} from 'ng2-charts';
import { User } from './login/user';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  
  mostrarMenu: boolean = false;
  pipe : DatePipe = new DatePipe('en-US'); 
  
  constructor(private authService: AuthService ) { }

  ngOnInit() {

    this.authService.mostrarMenuEmitter.subscribe(
      mostrar => this.mostrarMenu = mostrar
    );

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
