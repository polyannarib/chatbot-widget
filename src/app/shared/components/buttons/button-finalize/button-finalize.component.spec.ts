import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonFinalizeComponent } from './button-finalize.component';

describe('ButtonFinalizeComponent', () => {
  let component: ButtonFinalizeComponent;
  let fixture: ComponentFixture<ButtonFinalizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonFinalizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonFinalizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
