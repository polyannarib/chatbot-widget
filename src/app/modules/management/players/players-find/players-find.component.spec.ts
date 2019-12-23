import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersFindComponent } from './players-find.component';

describe('PlayersFindComponent', () => {
  let component: PlayersFindComponent;
  let fixture: ComponentFixture<PlayersFindComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayersFindComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersFindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
