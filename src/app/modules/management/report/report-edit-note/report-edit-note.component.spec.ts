import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportEditNoteComponent } from './report-edit-note.component';

describe('ReportEditNoteComponent', () => {
  let component: ReportEditNoteComponent;
  let fixture: ComponentFixture<ReportEditNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportEditNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportEditNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
