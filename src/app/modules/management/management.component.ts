import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {

  constructor(
    private profileService: ProfileService
  ) {
    // this.getProfile();
  }

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    this.profileService.getWhiteLabel().subscribe(
      (response) => {
        if (response.status == 0) {
          this.profileService.setWhiteLabel(response.object);
          return;
        }
        return;
      }, (err) => {
        return;
    })
  }

}
