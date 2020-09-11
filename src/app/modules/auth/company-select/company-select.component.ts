import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA, MatSnackBar } from '@angular/material';
import { AuthService } from 'src/app/core/services/auth.service';
import { NotifyComponent } from 'src/app/shared/components/notify/notify.component';
import { AppConstants } from '../../../app.constants';

@Component({
  selector: 'app-company-select',
  templateUrl: './company-select.component.html',
  styleUrls: ['./company-select.component.css']
})
export class CompanySelectComponent implements OnInit {

  loader: boolean = false;
  form: any;

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<CompanySelectComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  onLogin(companyCode: number): void {
    
    this.loader = true;
    this.form = this.data.form;
    this.form.companyCode = companyCode;

    this.authService.login(this.form).subscribe(
      (response) => {
        if(response.status == 0) {
          this.authService.setAppToken(response.object.appToken);
          // this.authService.setSSOID(response.object.ssoId);
          // window.location.href = AppConstants.URL_SSO + '/cookie' 
          //         + '?SSOID=' + response.object.ssoId
          //         + '&urlRedirect=' + AppConstants.WORKPLAYER_HOME + '/management/cockpit';
          this.close({selected : true});
          // this._bottomSheetRef.dismiss({selected : true});
          return;
        }
        this.loader = false;
        this.close();
      }, (err) => {
        this.loader = false;
        // this._bottomSheetRef.dismiss();
        // this.close()
        this._snackBar.openFromComponent(NotifyComponent, 
          { data: { type: 'error', message: 'Problemas ao fazer o login, favor tentar novamente!' }});
        this.close({err : true});
    })
  }

  close(data?): void {
    if(data) {
      this._bottomSheetRef.dismiss(data);
    } else {
      this._bottomSheetRef.dismiss();
    }
    event.preventDefault();
  }

}
