import {Component, Inject, OnInit} from '@angular/core';
import {TaskService} from '../../../../core/services/task.service';
import {ProfileService} from '../../../../core/services/profile.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NotifyComponent} from '../../../../shared/components/notify/notify.component';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-task-create',
  templateUrl: './modal-kysmart.component.html',
  styleUrls: ['./modal-kysmart.component.css']
})
export class ModalKysmartComponent implements OnInit {

  loader = false;
  mainStyle = this.profileService.getAppMainColor();
  secoundStyle = this.profileService.getAppSecondaryColor();
  urlIframe: string = 'http://192.168.0.240:8081/kysmart/#/registerItem/';
  iframe: SafeResourceUrl;
  html: string;
  registerItemId: number;

  constructor(
    public dialogRef: MatDialogRef<ModalKysmartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private taskService: TaskService,
    private _snackBar: MatSnackBar,
    private profileService: ProfileService,
    public dialog: MatDialog,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.getRegisterItem();
  }

  getRegisterItem() {
    this.loader = true;
    this.taskService.callRegisterItemKySmart().subscribe(
      (response) => {
        this.loader = false;
        const object = response.object;
        this.registerItemId = object.registerItemId;
        this.urlIframe = this.urlIframe + this.registerItemId.toString();
        this.iframe = this.sanitizer.bypassSecurityTrustResourceUrl(this.urlIframe);
      },
      (err) => {
        this.loader = false;
        this._snackBar.
        openFromComponent(NotifyComponent, { data: { type: 'error', message: 'Erro ao chamar calculadora, favor tentar novamente!' }});
      }
    );
  }

  registerItem() {
    this.loader = true;
    console.log('Confirmar..');
    this.taskService.callRegisterItemIdKySmart(this.registerItemId).subscribe(
      (response) => {
        this.loader = false;
        console.log(response);
        this.dialogRef.close({confirm: true, data: response});
      },
      (err) => {
        this.loader = false;
        console.log(err);
        this._snackBar.openFromComponent(NotifyComponent, { data: { type: 'error', message: 'Erro no KySmart!' }});
      }
    );
  }
}
