import { AuthService } from "../../../core/services/auth.service";
import { Router } from "@angular/router";
import { Component, OnInit, AfterViewInit, Inject } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { User } from "src/app/shared/models/user";
import { AppConstants } from "../../../app.constants";
import { MatSnackBar } from "@angular/material/snack-bar";
import { NotifyComponent } from "src/app/shared/components/notify/notify.component";
import { MatBottomSheet } from "@angular/material";
import { CompanySelectComponent } from "../company-select/company-select.component";
import { ProfileService } from "src/app/core/services/profile.service";
import { MessagesFlowService } from "../../../core/services/messages-flow.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, AfterViewInit {
  loader: boolean = false;

  user: User;
  form: FormGroup = this.formBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required]],
    type: ["WEBPORTAL"],
  });
  formForgottenPassword: FormGroup = this.formBuilder.group({
    username: [null, [Validators.required]],
  });
  forgottenPasswordCard: boolean = false;
  showMessage: boolean = false;
  messageToShow: string;
  forgottenPasswordStatus: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _bottomSheet: MatBottomSheet,
    private profileService: ProfileService,
    private chat: MessagesFlowService
  ) {}

  ngAfterViewInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(["/management"]);
    }
  }

  ngOnInit() {}

  onLogin() {
    this.loader = true;
    if (this.form.valid) {
      this.form.value.password = btoa(this.form.value.password);
      this.authService.login(this.form.value).subscribe(
        (responseAuth) => {
          if (responseAuth.status == 0) {
            this.profileService.getProfile().subscribe((response) => {
              let getuser = /\w*[^@]/;
              let username = this.form.value.email.match(getuser);
                this.chat.getCredentials(
                {
                  username: username[0],
                  profileName: response.object.name,
                  sessionId: responseAuth.object.userToken,
                },
                this.form.value.password
              );
              this.authService.setAppToken(responseAuth.object.appToken);
            });
            this.getWhiteLavel();
            //this.infoToChatbot();
            return;
          }
          if (responseAuth.status == 1) {
            this.setError("Por favor, digite os campos corretamente!");
            this.loader = false;
          }
          if (responseAuth.status == 2) {
            const bottomSheetRef = this._bottomSheet.open(
              CompanySelectComponent,
              {
                data: {
                  form: this.form.value,
                  companys: responseAuth.object,
                },
              }
            );
            bottomSheetRef.afterDismissed().subscribe((response) => {
              if (response.selected === true) {
                this.getWhiteLavel();
                return;
              }
              this.setError("Problemas, contate o administrador!");
              this.loader = false;
            });
          }
        },
        (err) => {
          this.setError("Problemas ao fazer o login, favor tentar novamente!");
          this.loader = false;
        }
      );
    } else {
      this.setError("Por favor, digite os campos corretamente!");
      this.loader = false;
    }
  }

  onForgottenPassword() {
    this.loader = true;
    if (this.formForgottenPassword.valid) {
      this.authService
        .forgottenPassword(this.formForgottenPassword.value.username)
        .subscribe(
          (responseForgottenPassword) => {
            this.forgottenPasswordStatus =
              responseForgottenPassword.responseStatus;
            const message = responseForgottenPassword.responseMessage;
            this.showMessage = true;
            this.messageToShow = message;
            this.loader = false;
          },
          (err) => {
            this.setError(
              "Problemas ao fazer a requisição, favor tentar novamente!"
            );
            this.loader = false;
          }
        );
    } else {
      this.setError("Por favor, digite os campos corretamente!");
      this.loader = false;
    }
  }

  getWhiteLavel() {
    this.profileService.getWhiteLabel().subscribe(
      (response) => {
        if (response.status == 0) {
          this.profileService.setWhiteLabel(response.object);
          this.router.navigate(["/management/cockpit"]);
          return;

          // let scopes = this.authService.redirectPageByScopes();
          // window.location.href = AppConstants.URL_SSO + '/cookie'
          // + '?SSOID=' + response.object.ssoId
          // + '&urlRedirect=' + AppConstants.WORKPLAYER_HOME + `/management/cockpit`;
        }
        this.setError("Problemas ao fazer o login, favor tentar novamente!");
        // this._snackBar.openFromComponent(NotifyComponent,
        //   { data: { type: 'error', message: 'Problemas ao fazer o login, favor tentar novamente!' }});
        // return;
      },
      (err) => {
        this.setError("Problemas ao fazer o login, favor tentar novamente!");
        // this._snackBar.openFromComponent(NotifyComponent,
        //   { data: { type: 'error', message: 'Problemas ao fazer o login, favor tentar novamente!' }});
        // return;
      }
    );
  }

  setError(value) {
    this._snackBar.openFromComponent(NotifyComponent, {
      data: { type: "error", message: value },
    });
  }

  switchForgottenPasswordCard() {
    this.forgottenPasswordCard = !this.forgottenPasswordCard;
    this.showMessage = false;
    this.formForgottenPassword.setValue({ username: "" });
  }

  // onLogin() {
  //   this.loader = true;
  //   new Promise((resolve, reject) => {

  //     if (this.form.valid) {
  //       this.form.value.password = btoa(this.form.value.password);
  //       this.authService.login(this.form.value).subscribe(
  //         (responseAuth) => {
  //           if (responseAuth.status == 0) {
  //             this.authService.setAppToken(responseAuth.object.appToken);
  //             resolve();
  //           } if (responseAuth.status == 1) {
  //             reject(new Error('Por favor, digite os campos corretamente!'));
  //           } if (responseAuth.status == 2) {
  //             const bottomSheetRef = this._bottomSheet.open(CompanySelectComponent,
  //               { data: {
  //                 form: this.form.value,
  //                 companys: responseAuth.object
  //             }});
  //             bottomSheetRef.afterDismissed().subscribe((response) => {
  //               if(response.selected === true) {
  //                 resolve();
  //               }
  //               if(response.err === true) {
  //                 reject(new Error('Problemas, contate o administrador!'));
  //               }
  //             });
  //           }
  //         }, (err) => {
  //           reject(new Error('Problemas ao fazer o login, favor tentar novamente!'));
  //       })
  //     } else {
  //       reject(new Error('Por favor, digite os campos corretamente!'));
  //     }
  //   }).then((value) => {
  //     this.profileService.getWhiteLabel().subscribe(
  //       (response) => {
  //       if (response.status == 0) {
  //           this.profileService.setWhiteLabel(response.object);
  //           this.router.navigate(['/management/cockpit']);
  //           return;
  //       }
  //       throw new Error('Problemas ao fazer o login, favor tentar novamente!');
  //       }, (err) => {
  //         throw new Error('Problemas ao fazer o login, favor tentar novamente!');
  //     })
  //   }).catch((value) => {
  //     this._snackBar.openFromComponent(NotifyComponent,
  //       { data: { type: 'error', message: value }});
  //     return;
  //   }).finally(() => {
  //     this.loader = false;
  //   });
  // }

  // redirectByScopes(): string {
  //   let scopes = this.authService.getScopes();
  //   if(scopes.includes('wpplayer')) {
  //     return 'player'
  //   }
  //   if(scopes.includes('wpleader')) {
  //     return 'management'
  //   }
  // }

  // getProfile() {
  //   this.profileService.getWhiteLabel().subscribe(
  //       (response) => {
  //       if (response.status == 0) {
  //           this.profileService.setWhiteLabel(response.object);
  //           return;
  //       }
  //       return;
  //       }, (err) => {
  //       return;
  //   })
  // }
}
