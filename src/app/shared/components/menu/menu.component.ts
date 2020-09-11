import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { AppConstants } from '../../../app.constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  
  user: any
  clearSearch: any;
  menus: any;
  datas: any[] = [];
  menuList: any[];
  quantity = 4;
  scopes: any;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.scopes = Object.assign({}, this.authService.getScopes());
  }

  logout() {
    this.authService.logout();
    // let params = {
    //   "SYSTEM": AppConstants.SYSTEM_NAME
    // }
    // this.authService.temporaryToken(params).subscribe(
    //   (response) => {
    //       let tempToken = response["user-token"];
    //       this.authService.setTemporaryToken(tempToken);
    //       this.authService.logout().subscribe(
    //         () => {
    //           this.authService.removeToken();
    //           this.router.navigate( ['/auth/login'], { queryParams: { authenticated: false}} )
    //         }
    //       )  
    //   }
    // )
  }

}
