import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {

  clearSearch: any;
  menus: any;
  datas: any[] = [];
  menuList: any[];
  quantity = 4;

  constructor( ) { }

  ngOnInit() {
    // this.menuList = this.menuItems.getAll().items;
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
