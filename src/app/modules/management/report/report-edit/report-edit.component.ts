import { Component, OnInit, Inject, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { NoteService } from 'src/app/core/services/note.service';
import { NotifyComponent } from 'src/app/shared/components/notify/notify.component';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSnackBar } from '@angular/material';
import { empty, BehaviorSubject } from 'rxjs';
import { ReportEditNoteComponent } from '../report-edit-note/report-edit-note.component';

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
    projectId: [this.data.projectId],
    page: [1],
    pageSize: [50]
  });
  controls: FormArray;

  constructor(
    public dialogRef: MatDialogRef<ReportEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private noteService: NoteService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.getTypes();
    this.getStatus();
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
      this.noteService.findNotes(this.formFind.value).subscribe(
        (response) => {
          if (response.object.list.length > 0) {
            this.notes = response.object.list;
            this.loaderNotes = false;
            return;
            // this.refreshTable(response.object.list);
          } else {
            this.notes = null;
            this.loaderNotes = false;
            this.messageNotes = true;
          }
        }, (err) => {
          this.loaderNotes = false;
      })
    } else {
      this.loaderNotes = false;
    }
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
      width: '40vw',
      data: dataSend
    });
  }
  
  modalCreateNotesReport() {
    if(this.formFind.valid) {
      const dataSend = {
        type: 'create',
        projectId: this.formFind.value.projectId,
        statusId: this.formFind.value.statusId,
        typeId: this.formFind.value.typeId
      }
      const dialogRef = this.dialog.open(ReportEditNoteComponent, {
        width: '40vw',
        data: dataSend
      });
    } else {
      this._snackBar.openFromComponent(NotifyComponent, 
        { data: { type: 'error', message: 'Favor selecionar acima o tipo e o status da nota' }});
    }
  }

  // refreshTable(notas) {
  //   var newlist$: BehaviorSubject<any[]> = new BehaviorSubject(notas);
  //   this.listNotes = newlist$;
  //   this.dataSource = this.listNotes;
  //   var toGroups = this.listNotes.value.map(entity => {
  //     return new FormGroup({
  //       noteDescription: new FormControl(entity.noteDescription), 
  //       noteNum: new FormControl(entity.noteNum, Validators.required),
  //       noteDate: new FormControl(entity.noteDate),
  //       observation: new FormControl(entity.observation),
  //       noteStartDate: new FormControl(entity.noteStartDate),
  //       noteEndDate: new FormControl(entity.noteEndDate),
  //       criticallyLevel: new FormControl(entity.criticallyLevel)
  //     },{ updateOn: "blur" });
  //   });
  //   this.controls = new FormArray(toGroups);
  // }

  // updateField(index, field) {
  //   const control = this.getControl(index, field);
  //   if (control.valid) {
  //     console.log('entrou dentro do IF control.valid')
  //     let value = control.value;
  //     this.update(index, field, value);
  //   } else {
  //     console.log('entrou dentro do ELSE control.valid');
  //     return;
  //   }
  // }

  // getControl(index, fieldName) {
  //   const a = this.controls.at(index).get(fieldName) as FormControl;
  //   return this.controls.at(index).get(fieldName) as FormControl;
  // }

  // update(index, field, value) {
  //   this.notes = this.notes.map((e, i) => {
  //     if (index === i) {
  //       return {
  //         ...e,
  //         [field]: value
  //       }
  //     }
  //     return e;
  //   });
  //   this.listNotes.next(this.notes);
  // }

  // saveNotes() {
  //   let lista = [];
  //   this.notes.forEach((element) => {
  //     if(element.noteId) {
  //       lista.push(
  //         { 
  //           'noteId': element.noteId,
  //           'noteDescription': element.noteDescription,
  //           'noteNum': element.noteNum,
  //           'noteDate': element.noteDate,
  //           'observation': element.observation,
  //           'noteStartDate': element.noteStartDate,
  //           'noteEndDate': element.noteEndDate,
  //           'criticallyLevel': element.criticallyLevel,
  //           'status': {
  //             'id': this.formFind.value.statusId
  //           },
  //           'type': {
  //             'id': this.formFind.value.typeId
  //           },
  //           'project': {
  //             'id': this.data.projectId
  //           }
  //         }
  //       );  
  //     } else {
  //       lista.push(
  //         { 
  //           'noteDescription': element.noteDescription,
  //           'noteNum': element.noteNum,
  //           'noteDate': element.noteDate,
  //           'observation': element.observation,
  //           'noteStartDate': element.noteStartDate,
  //           'noteEndDate': element.noteEndDate,
  //           'criticallyLevel': element.criticallyLevel,
  //           'status': {
  //             'id': this.formFind.value.statusId
  //           },
  //           'type': {
  //             'id': this.formFind.value.typeId
  //           },
  //           'project': {
  //             'id': this.data.projectId
  //           }
  //         }
  //       );
  //     }
  //   })
  //   this.noteService.saveNotes(lista).subscribe(
  //     (response) => {
  //       console.log('----- noteService.saveNotes SUCCESS -----');
  //       console.log(response);
  //     }, (err) => {
  //       console.log('----- noteService.saveNotes ERROR -----');
  //       console.log(err);
  //   });
  // }

  // ngOnChanges(changes: SimpleChanges) {
  //   console.log(changes)
  //   console.log('----- entrou dentro do ngOnChanges');
  // }

  // noteDescription: "Adicionar nota"
  // noteNum: 1
  // noteDate: 1576520861000
  // observation: "Observação"
  // noteStartDate: null
  // noteEndDate: null
  // criticallyLevel: null

}
