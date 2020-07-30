import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProfileService } from 'src/app/core/services/profile.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SidebarComponent implements OnInit {

  mainStyle = this.profileService.getAppMainColor();
  logo = this.profileService.getAppLogo();
  icon = this.profileService.getAppIcon();

  constructor(
    private profileService: ProfileService
  ) { }

  ngOnInit() { }

}
