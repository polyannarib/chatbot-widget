import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  
  private company:string = 'bradesco';
  private themeWrapper = document.querySelector('body');

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<any[]>("../assets/themes.json").subscribe(data => {
      data.forEach(companyTheme => {
        if(companyTheme.name == this.company){
          Object.keys(companyTheme.theme).forEach(key => {
            this.themeWrapper.style.setProperty(key,companyTheme.theme[key]);
          })
        }
      });
    })

  }
}
