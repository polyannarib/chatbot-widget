import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  btnMenuClass: string;
  user: any

  constructor(
    private authService: AuthService
  ) {
    this.user = this.authService.getUser();
  }

  ngOnInit() {
    $('.dropdown-trigger').dropdown();
    if(document.body.classList.contains('nav-open')){
      document.querySelector('.navbar-toggle').classList.add('toggled');
    }
  }

  logout() {
    this.authService.logout();
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
