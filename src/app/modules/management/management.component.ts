import { Component, OnInit } from "@angular/core";
import { ProfileService } from "src/app/core/services/profile.service";
import { chatColors } from "../../shared/models/chatbotWhiteLabel";

@Component({
  selector: "app-management",
  templateUrl: "./management.component.html",
  styleUrls: ["./management.component.css"],
})
export class ManagementComponent implements OnInit {
  public whiteLabel: chatColors;

  constructor(private profileService: ProfileService) {
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
          let header = response.object.styles[0].value;
          let bot = response.object.styles[1].value;
          let user = response.object.styles[0].value;
          let buttons = response.object.styles[3].value;
          this.whiteLabel = {
            header: header,
            bot: bot,
            user: user,
            buttons: buttons,
          };
          return;
        }
        return;
      },
      (err) => {
        return;
      }
    );
  }
}
