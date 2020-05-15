import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NoteService } from 'src/app/core/services/note.service';
import { NotifyComponent } from 'src/app/shared/components/notify/notify.component';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-report-edit-note',
  templateUrl: './report-edit-note.component.html',
  styleUrls: ['./report-edit-note.component.css']
})
export class ReportEditNoteComponent implements OnInit {

  form: FormGroup;
  loader: boolean = false;
  typeDesc: Type[] = [{key: -1, value: 'Escolher'}];
  statusDesc: Status[] = [{key: -1, value: 'Escolher'}];

  mainStyle = this.profileService.getAppMainColor();

  constructor(
    public dialogRef: MatDialogRef<ReportEditNoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private noteService: NoteService,
    private _snackBar: MatSnackBar,
    private profileService: ProfileService
  ) { }

  ngOnInit() {
    this.getType();
  }

  getType() {
    if(this.data.type == 'edit') {
      this.data.note.noteDate = new Date();
      this.data.note.noteEndDate = new Date();
      this.form = this.formBuilder.group({
        noteId: [this.data.note.noteId, [Validators.required]],
        noteNum: [this.data.note.noteNum, [Validators.required]],
        noteDescription: [this.data.note.noteDescription, [Validators.required]],
        observation: [this.data.note.observation],
        noteDate: [new Date(this.data.note.noteDate)],
        noteStartDate: [this.data.note.noteStartDate],
        noteEndDate: [new Date(this.data.note.noteEndDate)],
        criticallyLevel: [this.data.note.criticallyLevel],
        status: this.formBuilder.group({
          id: [this.data.statusId.id]
        }),
        type: this.formBuilder.group({
          id: [this.data.typeId.id]
        }),
        project: this.formBuilder.group({
          id: [this.data.projectId]
        })
      });
      this.typeDesc.push({key: this.data.typeId.id, value: this.data.typeId.value});
      this.statusDesc.push({key: this.data.statusId.id, value: this.data.statusId.value});
    } if(this.data.type == 'create') {
      this.form = this.formBuilder.group({
        noteNum: [null, [Validators.required]],
        noteDescription: [null, [Validators.required]],
        observation: [null],
        noteDate: [null],
        noteStartDate: [null],
        noteEndDate: [null],
        criticallyLevel: [null],
        status: this.formBuilder.group({
          id: [this.data.statusId.id]
        }),
        type: this.formBuilder.group({
          id: [this.data.typeId.id]
        }),
        project: this.formBuilder.group({
          id: [this.data.projectId]
        })
      });
      this.typeDesc.push({key: this.data.typeId.id, value: this.data.typeId.value});
      this.statusDesc.push({key: this.data.statusId.id, value: this.data.statusId.value});
    }
  }

  saveNotes() {
    this.loader = true;
    this.form.value.noteDate = (this.form.value.noteDate != null) ? new Date(this.form.value.noteDate).getTime() : null;
    this.form.value.noteStartDate = (this.form.value.noteStartDate != null) ? new Date(this.form.value.noteStartDate).getTime() : null;
    this.form.value.noteEndDate = (this.form.value.noteEndDate != null) ? new Date(this.form.value.noteEndDate).getTime() : null;
    if(this.form.valid) {
      var noteSave = new Array(this.form.value);
      this.noteService.saveNotes(noteSave).subscribe(
        (response) => {
          if(response.status == 0) {
            this._snackBar.openFromComponent(NotifyComponent,
              { data: { type: 'success', message: 'Nota salva com sucesso!' }});
              this.loader = false;
            this.dialogRef.close();
            return;
          }
          this.loader = false;
          this._snackBar.openFromComponent(NotifyComponent,
            { data: { type: 'error', message: 'Problemas ao salvar a nota' }});
        }, (err) => {
          this.loader = false;
          this._snackBar.openFromComponent(NotifyComponent,
            { data: { type: 'error', message: 'Problemas ao preencher o formulário, contate o administrador!' }});
      });
    } else {
      this.loader = false;
      this._snackBar.openFromComponent(NotifyComponent,
        { data: { type: 'error', message: 'Favor preencher todos os campos corretamente' }});
    }
  }

}

interface Type {
  key: number;
  value: string;
}

interface Status {
  key: number;
  value: string;
}
