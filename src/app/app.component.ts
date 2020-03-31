import { Component, OnInit, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { company } from '../environments/environment'
import { TranslateService } from '@ngx-translate/core';
import { ProfileService } from './core/services/profile.service';

export interface EventEmitted {
  name: String;
  data?: any;
  error?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  
  btnMenuClass: string;
  private themeWrapper = document.querySelector('body');
  emitter = new EventEmitter();

  constructor(
    private http: HttpClient, 
    translate: TranslateService,
    private profileService: ProfileService
  ) {
    translate.setDefaultLang('pt');
    translate.use('pt');
    // this.getProfile();
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

  // getProfile() {
  //   this.profileService.getWhiteLabel().subscribe(
  //     (response) => {
  //       if(response.status == 0) {
  //         let data: EventEmitted = {
  //           name: 'PROFILE_COMPANY',
  //           data: response.object
  //         }
  //         this.emitter.emit(data);
  //         return;
  //       }
  //     }
  //   );
  // }

}