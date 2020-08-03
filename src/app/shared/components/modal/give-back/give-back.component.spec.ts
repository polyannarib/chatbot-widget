import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiveBackComponent } from './give-back.component';

describe('GiveBackComponent', () => {
  let component: GiveBackComponent;
  let fixture: ComponentFixture<GiveBackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiveBackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiveBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
