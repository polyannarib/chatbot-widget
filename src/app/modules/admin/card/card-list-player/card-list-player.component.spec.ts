import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardListPlayerComponent } from './card-list-player.component';

describe('CardListPlayerComponent', () => {
  let component: CardListPlayerComponent;
  let fixture: ComponentFixture<CardListPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardListPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardListPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
