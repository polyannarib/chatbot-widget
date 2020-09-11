import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonDesignateComponent } from './button-designate.component';

describe('ButtonDesignateComponent', () => {
  let component: ButtonDesignateComponent;
  let fixture: ComponentFixture<ButtonDesignateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonDesignateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonDesignateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
