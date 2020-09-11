import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonRemoveComponent } from './button-remove.component';

describe('ButtonRemoveComponent', () => {
  let component: ButtonRemoveComponent;
  let fixture: ComponentFixture<ButtonRemoveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonRemoveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
