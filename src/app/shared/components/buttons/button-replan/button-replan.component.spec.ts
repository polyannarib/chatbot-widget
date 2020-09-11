import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonReplanComponent } from './button-replan.component';

describe('ButtonReplanComponent', () => {
  let component: ButtonReplanComponent;
  let fixture: ComponentFixture<ButtonReplanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonReplanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonReplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
