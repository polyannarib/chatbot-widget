import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonInitializeComponent } from './button-initialize.component';

describe('ButtonInitializeComponent', () => {
  let component: ButtonInitializeComponent;
  let fixture: ComponentFixture<ButtonInitializeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonInitializeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonInitializeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
