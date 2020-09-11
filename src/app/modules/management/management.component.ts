import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {
  public whiteLabel = { header: "", bot: "", user: "", buttons: "" };

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
          this.whiteLabel.header = response.object.styles[0].value;
          this.whiteLabel.bot = response.object.styles[1].value;
          this.whiteLabel.user = response.object.styles[0].value;
          this.whiteLabel.buttons = response.object.styles[3].value;
          console.log(this.whiteLabel);
          return;
        }
        return;
      }, (err) => {
        return;
    })
  }

}
