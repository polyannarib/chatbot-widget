import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBindComponent } from './card-bind.component';

describe('CardBindComponent', () => {
  let component: CardBindComponent;
  let fixture: ComponentFixture<CardBindComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardBindComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardBindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
