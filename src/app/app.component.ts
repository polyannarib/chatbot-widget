import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { company } from '../environments/environment'
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  
  private themeWrapper = document.querySelector('body');

  constructor(private http: HttpClient, translate: TranslateService) {
    translate.setDefaultLang('pt');
    translate.use('pt');
  }

  ngOnInit() {
    this.http.get<any[]>("assets/themes.json").subscribe(data => {
      data.forEach(companyTheme => {
        if(companyTheme.name == company){
          Object.keys(companyTheme.theme).forEach(key => {
            this.themeWrapper.style.setProperty(key,companyTheme.theme[key]);
          })
        }
      });
    })

  }
}
