import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTaskHourComponent } from './edit-task-hour.component';

describe('EditTaskHourComponent', () => {
  let component: EditTaskHourComponent;
  let fixture: ComponentFixture<EditTaskHourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTaskHourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTaskHourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
