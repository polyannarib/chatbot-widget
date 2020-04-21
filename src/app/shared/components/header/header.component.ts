import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { AppConstants } from '../../../app.constants';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/core/services/profile.service';

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  btnMenuClass: string;
  user: any
  mainStyle = this.profileService.getAppSecondaryColor();

  constructor(
    private authService: AuthService,
    private router: Router,
    private profileService: ProfileService
  ) { 
    this.getPlayerProfile();
  }

  ngOnInit() {
    $('.dropdown-trigger').dropdown();
    if(document.body.classList.contains('nav-open')){
      document.querySelector('.navbar-toggle').classList.add('toggled');
    }
  }

  // logout() {
  //   debugger;
  //   let params = {
  //     "SYSTEM": AppConstants.SYSTEM_NAME
  //   }
  //   this.authService.temporaryToken(params).subscribe(
  //     (response) => {
  //         let tempToken = response["user-token"];
  //         this.authService.setTemporaryToken(tempToken);
  //         this.authService.logout().subscribe(
  //           () => {
  //             this.authService.removeToken();
  //             this.router.navigate( ['/login'], { queryParams: { authenticated: false}} );
  //           }
  //         )  
  //     }
  //   )
  // }

  toggleMenu(position?) {
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

  // getPicture() {
  //   return 'url(https://www.kyros.com.br/portal-webplayer-images/Players/' + this.user.replace().replace(/\s+/g, '').toLowerCase() + '.png)';
  // }

  getPlayerProfile() {
    this.profileService.getProfile().subscribe(
      (response) => { this.user = response.object }
    )
  }

}
