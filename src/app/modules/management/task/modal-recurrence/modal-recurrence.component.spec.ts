import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRecurrenceComponent } from './modal-recurrence.component';

describe('ModalKySmart', () => {
  let component: ModalRecurrenceComponent;
  let fixture: ComponentFixture<ModalRecurrenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalRecurrenceComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRecurrenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
