import { Component, OnInit } from "@angular/core";
import { ProfileService } from "src/app/core/services/profile.service";
import { chatColors } from "../../shared/models/chatbotWhiteLabel";

@Component({
  selector: "app-management",
  templateUrl: "./management.component.html",
  styleUrls: ["./management.component.css"],
})
export class ManagementComponent implements OnInit {
  public whiteLabel: chatColors = {
    header: { color: "", font: "" },
    bot: { color: "", font: "" },
    user: { color: "", font: "" },
    buttons: { color: "", font: "" } 
  }
 // public senderInfo: { profileName: string; sessionId: string };

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
          let user = response.object.styles[1].value;
          let buttons = response.object.styles[3].value;
          this.whiteLabel.header.color = header;
          this.whiteLabel.header.font = "";
          this.whiteLabel.bot.color = "#F0F0F0";
          this.whiteLabel.bot.font = "#000";
          this.whiteLabel.user.color = user;
          this.whiteLabel.user.font = "";
          this.whiteLabel.buttons.color = buttons;
          this.whiteLabel.buttons.font = "";
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
