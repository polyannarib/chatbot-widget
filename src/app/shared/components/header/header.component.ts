import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    $('.dropdown-trigger').dropdown();
  }

  logout() {
    this.authService.logout();
  }

}
