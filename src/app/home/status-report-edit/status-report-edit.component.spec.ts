import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusReportEditComponent } from './status-report-edit.component';

describe('StatusReportEditComponent', () => {
  let component: StatusReportEditComponent;
  let fixture: ComponentFixture<StatusReportEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusReportEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusReportEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
