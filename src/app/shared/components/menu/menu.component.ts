import { Component, Inject, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';

import { MenuService } from '../../services/menu.service';
import { MenuItems } from './menu.json';
import { addAllToArray } from '@angular/core/src/render3/util';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit, AfterViewInit {

  clearSearch: any;
  menus: any;
  datas: any[] = [];
  menuList: any[];
  quantity = 4;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private route: ActivatedRoute,
    private menuService: MenuService,
    private menuItems: MenuItems,
  ) { }

  ngOnInit() {

    this.menuList = this.menuItems.getAll().items;

  }

  ngAfterViewInit() {
    // Procura por um subitem de menu ativo (igual rota atual), mantendo a exibição de seu container
    setTimeout(function (that) {
      that.menuList.some(item => {
        if (item.children) {
          return item.children.some(subItem => {
            const menuTitle = item.title.toLowerCase();
            const subMenuTitle = subItem.title.toLowerCase();
            if (subItem.path === that.route.routeConfig.path) { // Se o path é igual ao da rota atual:
              that.document.getElementById('menu-' + menuTitle).classList.add('active');
              that.document.getElementById('link-' + menuTitle).classList.remove('collapsed');
              that.document.getElementById('link-' + menuTitle).setAttribute('aria-expanded', 'true');
              that.document.getElementById(menuTitle).classList.add('show');
              return true; // sai de todo o loop
            }
          });
        }
      });
  }, 100, this);
  }

/*   menu() {
    this.menuService.get().subscribe(resp => {
      this.menuList = resp;
      sessionStorage.setItem('menu', JSON.stringify(this.menuList));
    });
  } */

}
