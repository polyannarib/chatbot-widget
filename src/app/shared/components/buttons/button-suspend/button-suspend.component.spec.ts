import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonSuspendComponent } from './button-suspend.component';

describe('ButtonSuspendComponent', () => {
  let component: ButtonSuspendComponent;
  let fixture: ComponentFixture<ButtonSuspendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonSuspendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonSuspendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
