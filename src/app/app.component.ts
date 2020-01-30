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
  btnMenuClass: string;
  private themeWrapper = document.querySelector('body');

  constructor(
    private http: HttpClient, translate: TranslateService
  ) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('pt');
    // the lang to use, if the lang isn't available, it will use the current loader to get them
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

    this.btnMenuClass = 'hamRotate';
    this.toggleMenu('left');
  }

  toggleMenu(position) {
    if (position === 'left') {
      document.body.classList.toggle('sidebar-mini');
      if (this.btnMenuClass === 'hamRotate') {
        this.btnMenuClass = 'hamRotateInvert';
      } else {
        this.btnMenuClass = 'hamRotate';
      }
    } else {
      // document.querySelector('.row-offcanvas-right').classList.toggle('active');
      document.querySelector('body').classList.toggle('nav-open');
      setTimeout(() => {
        document.querySelector('.navbar-toggle').classList.toggle('toggled');
      }, 300);
    }
  }
}
