import { Component, OnInit, Inject, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { NoteService } from 'src/app/core/services/note.service';
import { NotifyComponent } from 'src/app/shared/components/notify/notify.component';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSnackBar } from '@angular/material';
import { empty, BehaviorSubject } from 'rxjs';
import { ReportEditNoteComponent } from '../report-edit-note/report-edit-note.component';
import { ProjectEditComponent } from '../../projects/project-edit/project-edit.component';
import { environment } from 'src/environments/environment';
import { ProfileService } from 'src/app/core/services/profile.service';

declare var $: any;

@Component({
  selector: 'app-report-edit',
  templateUrl: './report-edit.component.html',
  styleUrls: ['./report-edit.component.css']
})
export class ReportEditComponent implements OnInit {

  loaderNotes: boolean = false;
  messageNotes: boolean = false;

  typeNotes: any;
  statusNotes: any;
  notes: any;
  listNotes: any;
  editNotes: any;
  dataSource: any;

  displayedColumns: string[] = ['noteDescription', 'noteNum', 'noteDate', 'observation', 'noteStartDate', 'noteEndDate', 'criticallyLevel'];
  columnsToDisplay: string[] = this.displayedColumns.slice();

  formFind: FormGroup = this.formBuilder.group({
    typeId: [null, [Validators.required]],
    statusId: [null, [Validators.required]],
    projectId: [this.data.project.id],
    page: [1],
    pageSize: [50]
  });
  controls: FormArray;

  mainStyle = this.profileService.getAppMainColor();

  constructor(
    public dialogRef: MatDialogRef<ReportEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private noteService: NoteService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private profileService: ProfileService
  ) { }

  ngOnInit() {
    this.getTypes();
    this.getStatus();
    this.notesLoader();
  }

  getTypes() {
    this.noteService.findTypesNotes().subscribe(
      (response) => {
        if(response.status == 0) {
          this.typeNotes = response.object;
        }
      }, (err) => {
    })
  }

  getStatus() {
    this.noteService.findStatusNotes().subscribe(
      (response) => {
        if(response.status == 0) {
          this.statusNotes = response.object;
        }
      }, (err) => {
    })
  }

  findNotes() {
    this.messageNotes = false;
    this.loaderNotes = true;
    if (this.formFind.valid) {
      // this.notesLoader();
      this.noteService.findNotes(this.formFind.value).subscribe(
        (response) => {
          if (response.object.list.length > 0) {
            this.notes = response.object.list;
            this.loaderNotes = false;
            return;
          } else {
            // this._snackBar.openFromComponent(NotifyComponent,
            //   { data: { type: 'error', message: 'Não foi encontrado nenhuma nota' }});
            this.notes = null;
            this.loaderNotes = false;
            this.messageNotes = true;
          }
        }, (err) => {
          this.loaderNotes = false;
          this._snackBar.openFromComponent(NotifyComponent,
            { data: { type: 'error', message: 'Problemas para procurar as notas' }});
      })
    } else {
      this.loaderNotes = false;
      this._snackBar.openFromComponent(NotifyComponent,
        { data: { type: 'error', message: 'Ops, os campos de tipo e status devem estar selecionados' }});
    }
  }

  notesLoader() {
    const data = {
      projectId: this.data.project.id,
      page: 1,
      pageSize: 50
    }
    this.loaderNotes = true;
    this.noteService.findNotes(data).subscribe(
      (response) => {
        if (response.object.list.length > 0) {
          this.notes = response.object.list;
          this.loaderNotes = false;
          return;
        } else {
          // this._snackBar.openFromComponent(NotifyComponent,
          //   { data: { type: 'error', message: 'Não foi encontrado nenhuma nota' }});
          this.notes = null;
          this.loaderNotes = false;
          this.messageNotes = true;
        }
      }, (err) => {
        this.loaderNotes = false;
        this._snackBar.openFromComponent(NotifyComponent,
          { data: { type: 'error', message: 'Problemas para procurar as notas' }});
    })
  }

  modalEditNotesReport(note) {
    const dataSend = {
      type: 'edit',
      note: note,
      projectId: this.formFind.value.projectId,
      statusId: this.formFind.value.statusId,
      typeId: this.formFind.value.typeId
    }
    const dialogRef = this.dialog.open(ReportEditNoteComponent, {
      width: '600px',
      data: dataSend
    });
    dialogRef.afterClosed().subscribe(result => {
      this.notesLoader();
    });
  }

  modalCreateNotesReport() {
    // if(this.formFind.valid) {
      const dataSend = {
        type: 'create',
        projectId: this.formFind.value.projectId,
        // statusId: {id: this.formFind.value.statusId, value: this.statusNotes.find(x => x.id === this.formFind.value.statusId).description},
        // typeId: {id: this.formFind.value.typeId, value: this.typeNotes.find(x => x.id === this.formFind.value.typeId).description}
      };
      const dialogRef = this.dialog.open(ReportEditNoteComponent, {
        width: '40vw',
        data: dataSend
      });
      dialogRef.afterClosed().subscribe(result => {
        this.notesLoader();
      });
    // } else {
    //   this._snackBar.openFromComponent(NotifyComponent,
    //     { data: { type: 'error', message: 'Favor selecionar acima o tipo e o status da nota' }});
    // }
  }

  modalEditProject(project) {
    const dataSend = {
      project: this.data.project
    }
    const dialogRef = this.dialog.open(ProjectEditComponent, {
      width: '50vw',
      data: dataSend
    });
  }

  generateReport() {
    window.open( environment.URL_STATUS_REPORT + this.data.project.id, '_blank');
  }

}
