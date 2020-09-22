import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignatePlayerComponent } from './designate-player.component';

describe('DesignatePlayerComponent', () => {
  let component: DesignatePlayerComponent;
  let fixture: ComponentFixture<DesignatePlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignatePlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignatePlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
