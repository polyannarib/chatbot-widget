import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonGiveBackComponent } from './button-give-back.component';

describe('ButtonGiveBackComponent', () => {
  let component: ButtonGiveBackComponent;
  let fixture: ComponentFixture<ButtonGiveBackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonGiveBackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonGiveBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
