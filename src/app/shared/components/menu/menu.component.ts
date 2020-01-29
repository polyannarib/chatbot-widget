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

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.user = this.authService.getUser();
  }

  ngOnInit() {
    // this.menuList = this.menuItems.getAll().items;
  }

  logout() {
    debugger;
    let params = {
      "SYSTEM": AppConstants.SYSTEM_NAME
    }
    this.authService.temporaryToken(params).subscribe(
      (response) => {
          let tempToken = response["user-token"];
          this.authService.setTemporaryToken(tempToken);
          this.authService.logout().subscribe(
            () => {
              this.authService.removeToken();
              this.router.navigate( ['/auth/login'], { queryParams: { authenticated: false}} )
            }
          )  
      }
    )
  }

  // ngAfterViewInit() {
  //   // Procura por um subitem de menu ativo (igual rota atual), mantendo a exibição de seu container
  //   setTimeout(function (that) {
  //     that.menuList.some(item => {
  //       if (item.children) {
  //         return item.children.some(subItem => {
  //           const menuTitle = item.title.toLowerCase();
  //           const subMenuTitle = subItem.title.toLowerCase();
  //           if (subItem.path === that.route.routeConfig.path) { 
  //             that.document.getElementById('menu-' + menuTitle).classList.add('active');
  //             that.document.getElementById('link-' + menuTitle).classList.remove('collapsed');
  //             that.document.getElementById('link-' + menuTitle).setAttribute('aria-expanded', 'true');
  //             that.document.getElementById(menuTitle).classList.add('show');
  //             return true;
  //           }
  //         });
  //       }
  //     });
  //   }, 100, this);
  // }

/*   menu() {
    this.menuService.get().subscribe(resp => {
      this.menuList = resp;
      sessionStorage.setItem('menu', JSON.stringify(this.menuList));
    });
  } */

}
