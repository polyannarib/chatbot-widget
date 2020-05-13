import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalKysmartComponent } from './modal-kysmart.component';

describe('ModalKySmart', () => {
  let component: ModalKysmartComponent;
  let fixture: ComponentFixture<ModalKysmartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalKysmartComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalKysmartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
